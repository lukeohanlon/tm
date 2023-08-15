class RemoveUserIdFromMedications < ActiveRecord::Migration[7.1]
  def change
    remove_column :medications, :user_id, :integer
  end
end
