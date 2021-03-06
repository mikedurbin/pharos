class RemoveGroupsFromIntellectualObjects < ActiveRecord::Migration[4.2]
  def change
    remove_column :intellectual_objects, :read_groups, :string
    remove_column :intellectual_objects, :edit_groups, :string
    remove_column :intellectual_objects, :discover_groups, :string
  end
end
