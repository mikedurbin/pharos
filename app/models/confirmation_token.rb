class ConfirmationToken < ActiveRecord::Base
  belongs_to :intellectual_object
  belongs_to :generic_file

  validates :token, presence: true
  validate :has_parent
  before_save :init_token

  private
  def init_token
    self.token = SecureRandom.hex if self.token.nil?
  end

  def has_parent
    if self.intellectual_object_id.nil? && self.generic_file_id.nil?
      errors.add(:intellectual_object_id, 'or generic_file_id must be present')
      errors.add(:generic_file_id, 'or intellectual_object_id must be present')
    end
  end
end