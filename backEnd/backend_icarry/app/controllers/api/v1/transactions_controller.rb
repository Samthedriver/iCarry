class Api::V1::TransactionsController < ApplicationController
  def index
    render json: Transaction.all
  end


  def create
    @transaction = Transaction.create(transaction_params)
    if @transaction.valid?
      render json: { transaction: TransactionSerializer.new(@transaction) }, status: :created
    else
      render json: { error: 'failed to create transaction' }, status: :not_acceptable
    end
  end

  def update
    transaction = Transaction.find(params[:id])
    transaction.update_attributes(transaction_params)
    render json: transaction
  end

  private
  def transaction_params
    params.require(:transaction).permit(:firstName, :lastName, :phoneNumber, :senderAddress, :description, :dimensions, :weight, :instructions, :pickupLocal, :dropoffLocal, :status, :comments, :user_id, :image)
  end
end
