class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :firstName, :lastName, :phoneNumber, :senderAddress, :description, :dimensions, :weight, :instructions, :pickupLocal, :dropoffLocal, :status, :comments, :user_id, :image
end
