class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :firstName
      t.string :lastName
      t.string :phoneNumber
      t.string :senderAddress
      t.text :description
      t.string :dimensions
      t.string :weight
      t.text :instructions
      t.string :pickupLocal
      t.string :dropoffLocal
      t.integer :user_id
      t.string :status
      t.text :comments
      t.string :image
      t.timestamps
    end
  end
end
