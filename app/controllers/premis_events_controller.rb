class PremisEventsController < ApplicationController
  include FilterCounts
  respond_to :html, :json
  before_action :authenticate_user!
  before_action :load_and_authorize_parent_object, only: [:create]
  before_action :load_event, only: [:show]
  before_action :set_format
  #after_action :check_for_failed_fixity, only: :create
  after_action :verify_authorized, only: [:index, :create]

  def index
    @premis_events = PremisEvent.discoverable(current_user)
    if params[:object_identifier]
      load_intellectual_object
      identifier = params[:object_identifier]
    elsif params[:file_identifier]
      load_generic_file
      identifier = params[:file_identifier]
    elsif params[:institution_identifier]
      load_institution
      for_selected_institution
      identifier = params[:institution_identifier]
    else
      @parent = @premis_events.first.intellectual_object
    end
    params[:file_identifier] = '' if params[:file_identifier] == 'null' || params[:file_identifier] == 'blank'
    params[:file_identifier_like] = '' if params[:file_identifier_like] == 'null' || params[:file_identifier_like] == 'blank'
    if @parent.nil?
      authorize current_user, :nil_index?
      @institution = current_user.institution
      respond_to do |format|
        format.json { render nothing: true, status: :not_found }
        format.html { redirect_to root_url, alert: "A Premis Event parent (Institution/Intellectual Object/Generic File) with identifier: #{identifier} could not be found." }
      end
    else
      authorize @parent
      @institution = current_user.institution
      filter_count_and_sort
      page_results(@premis_events)
      respond_to do |format|
        format.json { render json: { count: @count, next: @next, previous: @previous, results: @paged_results.map { |event| event.serializable_hash } } }
        format.html { }
      end
    end
  end

  # This is a JSON call restricted to the Admin user.
  # The JSON is in the request body, and is parsed in
  # load_and_authorize_parent_object
  def create
    authorize @parent, :add_event?
    @event = @parent.add_event(@json_params)
    respond_to do |format|
      format.json {
        if @parent.save
          render json: @event.serializable_hash, status: :created
        else
          render json: @event.errors, status: :unprocessable_entity
        end
      }
    end
  end

  def show
    if @event
      authorize @event
      respond_to do |format|
        format.json { render json: @event.serializable_hash }
        format.html { }
      end
    else
      authorize current_user, :nil_event?
      respond_to do |format|
        format.json { render nothing: true, status: :not_found }
        format.html { redirect_to root_url, alert: 'That Premis Event could not be found.' }
      end
    end
  end

  def notify_of_failed_fixity
    authorize current_user
    params[:since] = (DateTime.now - 24.hours) unless params[:since]
    @events = PremisEvent.failed_fixity_checks(params[:since], current_user)
    institutions = @events.distinct.pluck(:institution_id)
    number_of_emails = 0
    inst_list = []
    institutions.each do |inst|
      inst_events = @events.where(institution_id: inst)
      institution = Institution.find(inst)
      log = Email.log_multiple_fixity_fail(inst_events)
      NotificationMailer.multiple_failed_fixity_notification(@events, log, institution).deliver!
      number_of_emails = number_of_emails + 1
      inst_list.push(institution.name)
    end
    if number_of_emails == 0
      respond_to do |format|
        format.json { render json: { message: 'No new failed fixity checks, no emails sent.' }, status: 204 }
      end
    else
      inst_pretty = inst_list.join(', ')
      respond_to do |format|
        format.json { render json: { message: "#{number_of_emails} sent. Institutions that received a failed fixity notification: #{inst_pretty}." }, status: 200 }
      end
    end
  end

  protected

  def load_intellectual_object
    # Param names should be consistent!
    identifier_param = params[:object_identifier]
    if identifier_param.blank? && !params[:intellectual_object_identifier].blank?
      identifier_param = params[:intellectual_object_identifier]
    end
    identifier = identifier_param.gsub(/%2F/i, '/').gsub(/%3F/i, '?')
    @parent = IntellectualObject.where(identifier: identifier).first
    if @parent.nil? # This might have occurred because a '.html' or '.json' was appended to clarify the format. Try removing it.
      5.times do
        identifier.chop!
      end
      @parent = IntellectualObject.where(identifier: identifier).first
    end
    params[:intellectual_object_id] = @parent.id if @parent
    params[:object_identifier] = identifier if identifier
  end

  def load_generic_file
    identifier = params[:file_identifier].gsub(/%2F/i, '/').gsub(/%3F/i, '?')
    @parent = GenericFile.where(identifier: identifier).first
    if @parent.nil? # This might have occurred because a '.html' or '.json' was appended to clarify the format. Try removing it.
      5.times do
        identifier.chop!
      end
      @parent = GenericFile.where(identifier: identifier).first
    end
    params[:generic_file_id] = @parent.id if @parent
    params[:file_identifier] = identifier if identifier
  end

  def load_institution
    identifier = params[:institution_identifier].gsub(/%2F/i, '/').gsub(/%3F/i, '?')
    @parent = Institution.where(identifier: identifier).first
    params[:institution_id] = @parent.id if @parent
  end

  def load_and_authorize_parent_object
    @json_params = JSON.parse(request.body.read)
    if @parent.nil?
      if !@json_params['generic_file_identifier'].blank?
        @parent = GenericFile.where(identifier: @json_params['generic_file_identifier']).first
      elsif !@json_params['intellectual_object_identifier'].blank?
        @parent = IntellectualObject.where(identifier: @json_params['intellectual_object_identifier']).first
      end
    end
    authorize @parent, :add_event?
  end

  def load_event
    @event = PremisEvent.readable(current_user).find(params[:id])
  end

  def for_selected_institution
    unless @parent.nil?
      (current_user.admin? && @parent.identifier == Pharos::Application::APTRUST_ID) ? @premis_events = PremisEvent.all : @premis_events = @premis_events.with_institution(@parent.id)
    end
  end

  def filter_count_and_sort
    @premis_events = @premis_events
                         .with_institution(params[:institution])
                         .with_type(params[:event_type])
                         .with_outcome(params[:outcome])
                         .with_create_date(params[:created_at])
                         .created_before(params[:created_before])
                         .created_after(params[:created_after])
                         .with_event_identifier(params[:event_identifier])
                         .with_object_identifier(params[:object_identifier])
                         .with_object_identifier_like(params[:object_identifier_like])
                         .with_file_identifier(params[:file_identifier])
                         .with_file_identifier_like(params[:file_identifier_like])
    @selected = {}
    get_event_institution_counts(@premis_events)
    get_event_type_counts(@premis_events)
    get_outcome_counts(@premis_events)
    query = "SELECT COUNT(*) FROM (#{@premis_events.to_sql}) AS event_index"
    result = ActiveRecord::Base.connection.exec_query(query)
    count = result[0]['count']
    set_page_counts(count)
    case params[:sort]
      when 'date'
        @premis_events = @premis_events.order('date_time DESC')
      when 'name'
        @premis_events = @premis_events.order('identifier').reverse_order
      when 'institution'
        @premis_events = @premis_events.joins(:institution).order('institutions.name')
    end
  end

  private

  def set_format
    request.format = 'html' unless request.format == 'json' || request.format == 'html'
  end

  def check_for_failed_fixity
    if @event.event_type == Pharos::Application::PHAROS_EVENT_TYPES['fixity'] && @event.outcome == 'Failure'
      log = Email.log_fixity_fail(@event.identifier)
      NotificationMailer.failed_fixity_notification(@event, log).deliver!
    else
      return
    end
  end

end
