class GenericFile < ActiveRecord::Base
  #include Auditable   # premis events

  belongs_to :intellectual_object
  has_many :premis_events
  has_many :checksums
  accepts_nested_attributes_for :checksums

  validates :uri, presence: true
  validates :intellectual_object, presence: true
  validates :size, presence: true
  validates :created, presence: true
  validates :modified, presence: true
  validates :file_format, presence: true
  validates :identifier, presence: true
  validate :has_right_number_of_checksums
  validate :identifier_is_unique

  delegate :institution, to: :intellectual_object

  def to_param
    identifier
  end

  def find_latest_fixity_check
    fixity = ''
    latest = self.premis_events.where(event_type: 'fixity_check').order('date_time DESC').first.date_time
    fixity = latest unless latest.nil?
    fixity
  end

  def self.find_files_in_need_of_fixity(date, options={})
    #TODO: rewrite logic to find files where latest checksum created_at datetime is more than 90 days old
    # rows = options[:rows] || 10
    # start = options[:start] || 0
    # files = GenericFile.where("object_state:A AND latest_fixity_dti:[* TO #{date}]",
                                           #  sort: 'latest_fixity_dti asc', start: start, rows: rows)
  end

  def self.bytes_by_format
    stats = GenericFile.sum(:size)
    if stats
      cross_tab = GenericFile.group(:file_format).sum(:size)
      cross_tab['all'] = stats
      cross_tab
    else
      {'all' => 0}
    end

  end

  def display
    identifier
  end

  def content_uri= uri
    content.dsLocation = uri
  end

  def soft_delete(attributes)
    user_email = attributes[:outcome_detail]
    io = IntellectualObject.find(self.intellectual_object_id)
    WorkItem.create_delete_request(io.identifier,
                                        self.identifier,
                                        user_email)
    self.state = 'D'
    self.add_event(attributes)
    save!
  end

  def institution_identifier
    ident = self.identifier.split('/')
    ident[0]
  end

  def intellectual_object_identifier
    ident = self.identifier.split('/')
    ident[1]
  end

  # This is for serializing JSON in the API.
  # Be sure all datetimes are formatted as ISO8601,
  # or some JSON parsers (like the golang parser)
  # will choke on them. The datetimes we pull back
  # from Fedora are strings that are not in ISO8601
  # format, so we have to parse & reformat them.
  def serializable_hash(options={})
    data = {
        id: id,
        uri: uri,
        size: size.to_i,
        created: Time.parse(created.to_s).iso8601,
        modified: Time.parse(modified.to_s).iso8601,
        file_format: file_format,
        identifier: identifier,
        state: state,
    }
    if options.has_key?(:include)
      data.merge!(checksums: serialize_checksums) if options[:include].include?(:checksums)
      data.merge!(premis_events: serialize_events) if options[:include].include?(:premis_events)
    end
    data
  end

  def serialize_checksums
    checksums.map do |cs|
      {
          algorithm: cs.algorithm.first,
          digest: cs.digest.first,
          datetime: Time.parse(cs.datetime.to_s).iso8601,
      }
    end
  end

  def add_event(attributes)
    event = self.premis_events.build(attributes)
    event.generic_file = self
    event.save!
    event
  end

  def serialize_events
    premis_events.map do |event|
      event.serializable_hash
    end
  end

  # Returns the checksum with the specified digest, or nil.
  # No need to specify algorithm, since we're using md5 and sha256,
  # and their digests have different lengths.
  def find_checksum_by_digest(digest)
    checksum = nil
    checksums.each do |cs|
      if cs.digest == digest
        checksum = cs
        break
      end
    end
    checksum
    #checksums.select { |cs| digest.strip == cs.digest.first.to_s.strip }.first
  end

  # Returns true if the GenericFile has a checksum with the specified digest.
  def has_checksum?(digest)
    find_checksum_by_digest(digest).nil? == false
  end

  def check_permissions
    permissions = intellectual_object.check_permissions if intellectual_object
    permissions
  end

  private

  def has_right_number_of_checksums
    if(self.checksums.length == 0)
      errors.add(:checksums, "can't be blank")
    else
      algorithms = Array.new
      self.checksums.each do |cs|
        if (algorithms.include? cs)
          errors.add(:checksums, "can't have multiple checksums with same algorithm")
        else
          algorithms.push(cs)
        end
      end
    end
  end

  def identifier_is_unique
    return if self.identifier.nil?
    count = 0;
    files = GenericFile.where(identifier: self.identifier)
    count +=1 if files.count == 1 && files.first.id != self.id
    count = files.count if files.count > 1
    if(count > 0)
      errors.add(:identifier, 'has already been taken')
    end
  end
end
