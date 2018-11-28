class UserSerializer < ActiveModel::Serializer
  attributes :username, :password, :bio, :avatar, :firstName, :lastName, :deliveries, :phoneNumber, :address
end
