import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MedCard from '../components/MedCard';
import EditModal from '../components/EditModal';
import { useAuth } from '../authContext';


const MyMeds = ({ meds, setMeds }) => {
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const { authToken: userToken } = useAuth();
  console.log('TOKEN: ' + userToken)

  const openEditModal = (medication) => {
    setSelectedMedication(medication);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedMedication(null);
    setShowEditModal(false);
  };

  useEffect(() => {
    // Fetch medications from the API and store them in the state
    const fetchMedications = async () => {
      try {
        console.log("User Token:", userToken); 
        if (userToken) {
        const response = await axios.get('http://13.48.19.43:3000/api/v1/medications', {
          headers: { Authorization: `Bearer ${userToken}` }
          
        });
        console.log("User Token:", userToken); 
        console.log("RESPONSEDATA :", response.data); 
        setMeds(response.data);
        setIsLoading(false); 

      }  else {
        // Redirect the user to the login page or handle unauthorized access
        console.log('User is not logged in');
      }
      }catch (error) {
        console.error('Error fetching medications:', error);
        setIsLoading(false); // Set isLoading to false

    };
  }

    fetchMedications();
  }, [userToken, setMeds]);

  const handleDelete = async (id) => {
    try {
      const apiBaseUrl = `http://13.48.19.43:3000/api/v1/medications/${id}`;
      await axios.delete(apiBaseUrl);
      // Remove the deleted medication from the state
      setMeds((prevMeds) => prevMeds.filter((med) => med.id !== id));
    } catch (error) {
      console.error('Error deleting medication:', error);
    }
  };
  const handleEdit = (updatedMed) => {
    const updatedMeds = meds?.map((med) =>
      med.id === updatedMed.id ? updatedMed : med
    );
    setMeds(updatedMeds);
    closeEditModal();
  };
  
    return (
      <div className='cont'>
        <h2 className="reminders-head">My Reminders</h2>
        <div className="meds">
          {isLoading ? (
            <div className='loading'><h2>Loading...  </h2><br />If you don't see your medications please Make sure you are signed in!</div>
          ) : (
            <div className="med-list">
              {meds?.map((medicine) => (
                <MedCard
                  key={medicine.id}
                  medicine={medicine}
                  handleDelete={handleDelete}
                  handleEdit={() => openEditModal(medicine)}
                />
              ))}
            </div>
          )}
        </div>
        {showEditModal && (
          <EditModal
            medication={selectedMedication}
            onClose={closeEditModal}
            onEditSuccess={handleEdit}
          />
        )}
      </div>
    );
};

export default MyMeds;
