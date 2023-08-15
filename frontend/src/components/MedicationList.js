import React, { useState } from 'react';
import DrugAutocomplete from './DrugAutoComplete';
import MyMeds from '../views/MyMeds';
import { useAuth } from '../authContext';

const MedicationList = () => {
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [meds, setMeds] = useState([])
  const [dummyState, setDummyState] = useState(false); 
  const addMedication = newMedication => {
    setMeds(prevMeds => [...prevMeds, newMedication]);
  };
  const { authToken } = useAuth();

  // This function will receive the selected drug information from DrugAutocomplete
  const handleDrugSelection = (selected) => {
    setSelectedDrug(selected);
  };
  const rendizzy = () => {
    setDummyState(!dummyState); 
  }
  
  return (
    <div>
      <h1 className='hpad'>Medication List</h1>
      <DrugAutocomplete onSelect={handleDrugSelection} onAddMedication={addMedication}/>
      <div className="medication-info">
        {selectedDrug && (
          <div>
            <h2>Selected Medication Information</h2>
            <p>Brand Name: {selectedDrug.brandName}</p>
            <p>Generic Name: {selectedDrug.genericName}</p>
            <p>Dosage Text: {selectedDrug.dosageText}</p>
            <p>Dosage Form: {selectedDrug.dosageForm}</p>
          </div>
        )}
        {/* <MyMeds  meds={meds} setMeds={setMeds}/> */}
         {authToken ? <MyMeds  meds={meds} setMeds={setMeds}/> :  <div className='loading'><h2>Loading...  </h2><br />If you don't see your medications please Make sure you are signed in!</div>}
      </div>
    </div>
  );
};

export default MedicationList;
