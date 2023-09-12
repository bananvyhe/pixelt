class CreateFinances < ActiveRecord::Migration[7.0]
  def change
    create_table :finances do |t|
      t.float :ballance
      t.integer :discont
      t.integer :accompaniment
      t.integer :domain
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
