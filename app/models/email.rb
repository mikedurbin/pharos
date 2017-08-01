class Email < ApplicationRecord
  has_and_belongs_to_many :premis_events
  has_and_belongs_to_many :work_items

  validates :email_type, presence: true
  validate :has_proper_association

  def self.log_fixity_fail(event_identifier)
    email_log = Email.create(email_type: 'fixity', event_identifier: event_identifier)
    email_log.save!
    email_log
  end

  def self.log_multiple_fixity_fail(events)
    email_log = Email.create(email_type: 'multiple_fixity')
    events.each { |event| event.emails.push(email_log) }
    if email_log.premis_events.count == events.count
      email_log.save!
      email_log
    else
      throw(:abort)
    end
  end

  def self.log_restoration(work_item_id)
    email_log = Email.create(email_type: 'restoration', item_id: work_item_id)
    email_log.save!
    email_log
  end

  def self.log_multiple_restoration(work_items)
    email_log = Email.create(email_type: 'multiple_restoration')
    work_items.each { |item| item.emails.push(email_log) }
    if email_log.work_items.count == work_items.count
      email_log.save!
      email_log
    else
      throw(:abort)
    end
  end

  private

  def has_proper_association
    if self.email_type == 'fixity'
      errors.add(:event_identifier, 'must not be blank for a failed fixity check email') if self.event_identifier.nil?
      errors.add(:item_id, 'must be left blank for a failed fixity check email') unless self.item_id.nil?
    elsif self.email_type == 'restoration'
      errors.add(:item_id, 'must not be blank for a restoration notification email') if self.item_id.nil?
      errors.add(:event_identifier, 'must be left blank for a restoration notification email') unless self.event_identifier.nil?
    elsif self.email_type == 'multiple_fixity'
      #errors.add(:premis_events, 'There must be at least one event associated with this type') if self.premis_events.count == 0
      errors.add(:work_items, 'There must be no items associated with this type') if self.work_items.count != 0
    elsif self.email_type == 'multiple_restoration'
      #errors.add(:work_items, 'There must be at least one item associated with this type') if self.work_items.count == 0
      errors.add(:premis_events, 'There must be no events associated with this type') if self.premis_events.count != 0
    end
  end
end
