class AddColumnsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :firstName, :string
    add_column :users, :lastName, :string
    add_column :users, :deliveries, :integer
    add_column :users, :phoneNumber, :string
    add_column :users, :address, :string
  end
end
