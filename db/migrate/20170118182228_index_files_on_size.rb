class IndexFilesOnSize < ActiveRecord::Migration[4.2]
  def change
    add_index :generic_files, :size
  end
end
