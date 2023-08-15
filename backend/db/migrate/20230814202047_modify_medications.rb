class ModifyMedications < ActiveRecord::Migration[7.1]
  def change
    change_column :medications, :user_id, :integer, null: true
  end
end
