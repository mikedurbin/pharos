class CreateUsers < ActiveRecord::Migration[4.2]
  def change
    create_table :users do |t|
      t.belongs_to :institution, index:true
      t.string :name
      t.string :email
      t.string :phone_number
      t.string :institution_pid
      t.string :institution
      t.timestamps null: false
    end
  end
end
