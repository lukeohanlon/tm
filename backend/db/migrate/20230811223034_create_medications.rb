class CreateMedications < ActiveRecord::Migration[7.1]
  def change
    create_table :medications do |t|
      t.string :generic_name
      t.string :purpose
      t.text :dosage_text
      t.string :dosage_form
      t.string :active_substance
      t.string :route
      t.date :reminder_date
      t.time :reminder_time
      t.string :recurring_interval
      t.string :dose

      t.timestamps
    end
  end
end
