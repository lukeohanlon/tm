class Api::V1::MedicationsController < ApplicationController
  before_action :set_medication, only: %i[show update destroy]
  skip_before_action :verify_authenticity_token, only: [:create]
  # before_action :authenticate_user! # Use Devise's method to authenticate user





  # skip_before_action :verify_authenticity_token

  
  # GET /medications
  def index
    @medications = Medication.all
    render json: @medications
  end

  # GET /medications/1
  def show
    render json: @medication
  end

  def create
    medication = Medication.new(medication_params)

    if medication.save
      render json: medication, status: :created
    else
      render json: { errors: medication.errors.full_messages }, status: :unprocessable_entity
    end
  end

  

  # PATCH/PUT /medications/1
  def update
    if @medication.update(medication_params)
      render json: @medication
    else
      render json: @medication.errors, status: :unprocessable_entity
    end
  end

  # DELETE /medications/1
  def destroy
    @medication.destroy
    render json: { message: 'Medication deleted successfully' }, status: :ok
  end

 private
 def set_medication
  @medication = Medication.find(params[:id])
rescue ActiveRecord::RecordNotFound
  render json: { error: 'Medication not found' }, status: :not_found
end
  

  # Only allow a list of trusted parameters through.
  def medication_params
    params.require(:medication).permit(
      # :user_id,
      :generic_name,
      :purpose,
      :dosage_text,
      :dosage_form,
      :active_substance,
      :route,
      :reminder_date,   
      :reminder_time, 
      :recurring_interval,  
      :dose             
    )
  end
  
end
