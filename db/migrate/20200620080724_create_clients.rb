class CreateClients < ActiveRecord::Migration[6.0]
  def change
    create_table :clients do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone
      t.belongs_to :manager, null: false, foreign_key: true
      t.integer :cycle
      t.integer :duration

      t.timestamps
    end
  end
end
