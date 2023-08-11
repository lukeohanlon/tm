import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from './Modal'

const DrugAutocomplete = ({onAddMedication}) => {
  const [inputValue, setInputValue] = useState('')
  const [brandNames, setBrandNames] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [medications, setMedications] = useState([])
  const [drugInfo, setDrugInfo] = useState([])
  const [selectedDrug, setSelectedDrug] = useState(null)

  const [showFullDosageText, setShowFullDosageText] = useState(false)
  const [selectedMedicines, setSelectedMedicines] = useState([])
  const [reminderDate, setReminderDate] = useState('')
  const [reminderTime, setReminderTime] = useState('')
  const [dose, setDose] = useState('')
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [recurringHours, setRecurringHours] = useState('');
  const [recurringMinutes, setRecurringMinutes] = useState('');




  const openReminderModal = () => {
    setShowReminderModal(true)
  }

  const closeReminderModal = () => {
    setShowReminderModal(false)
  }

  // This function will be used to set the drug when from dropdown
  const onSelect = selected => {
    setSelectedDrug(selected)
    setShowDropdown(false)
  }

  // min length of search input before suggestions
  const MIN_INPUT_LENGTH = 3

  // Fetch medications from the API
  const fetchMedications = async () => {
    try {
      const response = await axios.get('http://16.171.145.223:3000/api/v1/medications')
      setMedications(response.data)
    } catch (error) {
      console.error('Error fetching medications:', error)
    }
  }

  useEffect(() => {
    fetchMedications()
  }, [])

  // fetch drugs by brand name
  const fetchBrandNames = async () => {
    if (inputValue.length >= MIN_INPUT_LENGTH) {
      const apiKey = 'lpJ5J2uvxEZeQZkl3JtmeegWpMzgNlUcL00ahzZK'
      const apiUrl = `https://api.fda.gov/drug/event.json?api_key=${apiKey}&search=patient.drug.openfda.brand_name:"${inputValue}"`

      try {
        const response = await axios.get(apiUrl)
        const extractedBrandNames = response.data.results.flatMap(
          result =>
            result.patient?.drug?.flatMap(drug => drug.openfda?.brand_name) ||
            []
        )

        // Extract additional drug information
        const extractedDrugInfo = response.data.results.flatMap(
          result =>
            result.patient?.drug?.map(drug => ({
              medicinalproduct: drug.medicinalproduct,
              purpose: drug.purpose,
              product_type: drug.openfda?.product_type,
              route: drug.openfda?.route,
              substance_name: drug.openfda?.substance_name,
              generic_name: drug.openfda?.generic_name,
              dosage_and_administration: drug.dosage_and_administration,
            })) || []
        )

        // Sort brand names by how well they match the input value
        const sortedBrandNames = extractedBrandNames.sort((a, b) =>
          a.toLowerCase().includes(inputValue.toLowerCase()) &&
          !b.toLowerCase().includes(inputValue.toLowerCase())
            ? -1
            : !a.toLowerCase().includes(inputValue.toLowerCase()) &&
              b.toLowerCase().includes(inputValue.toLowerCase())
            ? 1
            : a.localeCompare(b)
        )

        setBrandNames(sortedBrandNames) // set sorted drug names when searching
        setDrugInfo(extractedDrugInfo) // Set the extracted drug information
        setShowDropdown(true)
      } catch (error) {
        console.error('Error fetching brand names:', error)
        setShowDropdown(false)
      }
    } else {
      setShowDropdown(false)
    }
  }


  const handleSelectBrand = async brandName => {
    const apiKey = 'lpJ5J2uvxEZeQZkl3JtmeegWpMzgNlUcL00ahzZK'
    brandName = brandName.toUpperCase()
    const apiUrl = `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=openfda.brand_name.exact:${encodeURIComponent(
      brandName
    )}&limit=1`

    try {
      const response = await axios.get(apiUrl)
      await fetchMedications()
      const selectedDrugInfo = response.data.results[0]

      if (selectedDrugInfo) {
        const purpose = selectedDrugInfo.purpose?.[0] || ''
        const extractedPurpose =
          purpose && purpose.includes('Purposes')
            ? purpose.split('Purposes ')[1]
            : purpose

        // Update the state with additional data for the selected drug
        setSelectedDrug({
          brandName: brandName || '',
          purpose: extractedPurpose || '',
          genericName: selectedDrugInfo.openfda.generic_name?.[0] || '',
          dosageText: selectedDrugInfo.dosage_and_administration || '',
          dosageForm: selectedDrugInfo.openfda.route?.[0] || '',
          activeSubstance: selectedDrugInfo.openfda.substance_name?.[0] || '',
          route: selectedDrugInfo.openfda.route?.join(', ') || '',
          dosageAmount: selectedDrugInfo.dosage_and_administration || '',
        })
        setInputValue('');

        setShowDropdown(false)
      } else {
        console.error('Selected drug information not found.')
      }
    } catch (error) {
      console.error('Error fetching drug data:', error)
    }
  }

  const saveSelectedMedicines = async () => {
    const apiBaseUrl = 'http://16.171.145.223:3000/api/v1/medications'
    console.log(selectedDrug.dosageText[0])
    try {
      if (selectedDrug) {
        const medicationData = {
          generic_name: selectedDrug.brandName || 'Not Availablee',
          purpose: selectedDrug.purpose || 'Not Available',
          dosage_text: selectedDrug.dosageText[0] || 'Not Available',
          dosage_form: selectedDrug.dosageForm || 'Not Available',
          active_substance: selectedDrug.activeSubstance || 'Not Available',
          route: selectedDrug.route || 'Not Available',
        }

        const response = await axios.post(`${apiBaseUrl}.json`, {
          medication: medicationData,
        })
        console.log('Medication created:', response.data)
      } else {
        console.error('No selected drug.')
      }
    } catch (error) {
      console.error('Error saving medicines:', error)
    }
  }

  // const handleRecurringFrequencyChange = event => {
  //   setRecurringFrequency(event.target.value);
  // };

  const addMedicine = medicine => {
    setSelectedMedicines([...selectedMedicines, medicine])
  }

  const cancelSelection = () => {
    setSelectedMedicines([])
  }

  const handleReminderDateChange = event => {
    setReminderDate(event.target.value)
  }
  const handleRecurringHoursChange = event => {
    setRecurringHours(event.target.value);
  };
  const handleRecurringMinutesChange = event => {
    setRecurringMinutes(event.target.value);
  };
  const handleReminderTimeChange = event => {
    setReminderTime(event.target.value);
  };
  
  const handleDoseChange = event => {
    setDose(event.target.value)
  }


  const createRecurringReminder = async () => {
    try {
      console.log(recurringHours, recurringMinutes)
      if (selectedDrug) {
        const medicationData = {
          generic_name: selectedDrug.brandName || 'Not Available',
          purpose: selectedDrug.purpose || 'Not Available',
          dosage_text: selectedDrug.dosageText[0] || 'Not Available',
          dosage_form: selectedDrug.dosageForm || 'Not Available',
          active_substance: selectedDrug.activeSubstance || 'Not Available',
          route: selectedDrug.route || 'Not Available',
          reminder_date: reminderDate,
          reminder_time: reminderTime,
          recurring_interval: `${recurringHours}h ${recurringMinutes}m`,
        };
  
        try {
          const response = await axios.post(
            'http://16.171.145.223:3000/api/v1/medications',
            { medication: medicationData }
          );
  
          // if (notificationPermission === 'granted') {
          //   scheduleRecurringNotifications(
          //     response.data.id,
          //     reminderTime,
          //     `${recurringHours}h ${recurringMinutes}m`
          //   );
          // }
          onAddMedication(response.data);
          closeReminderModal();
          console.log('Medication and Reminder created:', response.data);
        } catch (error) {
          console.error('Error creating medication and reminder:', error);
        }
      } else {
        console.error('No selected drug.');
      }
    } catch (error) {
      console.error('Error in createRecurringReminder:', error);
    }
  };
  



  const scheduleRecurringNotifications = async (
    medicationId,
    reminderTime,
    interval
  ) => {
    const totalMinutes = parseInt(recurringHours) * 60 + parseInt(recurringMinutes);
  
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const userSelectedTime = new Date(`2000-01-01T${reminderTime}`);
        let currentTime = userSelectedTime.getTime();
    
        for (let i = 0; i <= 24 * 60; i += totalMinutes) {
          currentTime += i * 60 * 1000; // Convert to milliseconds
          const notificationTime = new Date(currentTime);
    
          // Schedule the notification
          navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(
              `Reminder for ${selectedDrug.brandName}`,
              {
                body: `Time to take your medication: ${reminderTime}`,
                icon: '/path-to-icon.png',
                tag: `medication-reminder-${medicationId}`,
                badge: '/path-to-badge.png',
              }
            );
          });
        }
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };
  
  const renderDrugInfo = () => {
    if (selectedDrug) {
      const drugName = selectedDrug.brandName
        ? selectedDrug.brandName.charAt(0) +
          selectedDrug.brandName.slice(1).toLowerCase()
        : ''
      return (
        <div className="search-res-wrap">
          <h2>{drugName} Information</h2>
          {selectedDrug.brandName && (
            <p>
              <span className="blue">Brand Name:</span> {selectedDrug.brandName}
            </p>
          )}
          {selectedDrug.purpose && (
            <p>
              <span className="blue">Purpose:</span> {selectedDrug.purpose}
            </p>
          )}
          {selectedDrug.genericName && (
            <p>
              <span className="blue">Generic Name:</span>{' '}
              {selectedDrug.genericName}
            </p>
          )}
          {selectedDrug.dosageText && (
            <div>
              <p>
                <span className="blue">Dosage Text:</span>
              </p>
              <ul>
                {showFullDosageText
                  ? selectedDrug.dosageText[0]
                      .split(' • ')
                      .map((item, index) => <li key={index}>{item}</li>)
                  : selectedDrug.dosageText[0]
                      .split(' • ')
                      .slice(0, 50)
                      .map((item, index) => <li key={index}>{item}</li>)}
              </ul>
              {selectedDrug.dosageText[0].split(' • ').length > 50 && (
                <button
                  onClick={() => setShowFullDosageText(!showFullDosageText)}
                >
                  {showFullDosageText ? 'Less' : 'More'}
                </button>
              )}
            </div>
          )}
          {selectedDrug.dosageForm && (
            <p>
              <span className="blue">Dosage Form:</span>{' '}
              {selectedDrug.dosageForm}
            </p>
          )}
          {selectedDrug.activeSubstance && (
            <p>
              <span className="blue">Active Substance:</span>{' '}
              {selectedDrug.activeSubstance}
            </p>
          )}
          {selectedDrug.route && (
            <p>
              <span className="blue">Route:</span> {selectedDrug.route}
            </p>
          )}
          {selectedDrug && (
            <>
              <button onClick={openReminderModal}>Set Reminder</button>
              {/* <button onClick={saveSelectedMedicines}>Save Medicines</button> */}
            </>
          )}
          <button onClick={cancelSelection}>Cancel</button>
        </div>
      )
    }
    return null
  }

  const handleInputChange = event => {
    const { value } = event.target
    setInputValue(value)
  }

  useEffect(() => {
    fetchBrandNames()
  }, [inputValue])

  return (
    <div className="search-wrap">
      <input
        type="text"
        placeholder="Search for drugs by brand name..."
        value={inputValue}
        onChange={handleInputChange}
      />
      {showDropdown && brandNames.length > 0 && (
        <ul className="selectable-list">
          {brandNames.map((brandName, index) => (
            <li key={index} onClick={() => handleSelectBrand(brandName)}>
              {brandName}
            </li>
          ))}
        </ul>
      )}
      {showReminderModal && (
        <Modal brandName={selectedDrug.brandName} onClose={closeReminderModal}>
          
          <div className='mod-in'>
            <label>Date:</label>
            <input
              type="date"
              value={reminderDate}
              onChange={handleReminderDateChange}
            />
          </div>
          <div className='mod-in'>
            <label>Time:</label>
            <input
              type="time"
              value={reminderTime}
              onChange={handleReminderTimeChange}
              step="60" 
            />
          </div>
          
          <div className='mod-in'>
            <label>Dose:</label>
            <input type="text" value={dose} onChange={handleDoseChange} />
          </div>
          <div className='mod-ev'>
            <label>Due Every:</label> <br />
            <input
              type="number"
              value={recurringHours}
              onChange={handleRecurringHoursChange}
              placeholder="Hours"
            />
            <input
              type="number"
              value={recurringMinutes}
              onChange={handleRecurringMinutesChange}
              placeholder="Minutes"
            />
          </div>
          <div className="modal-btns">
          <button onClick={createRecurringReminder}>Save Reminder</button>
          <button onClick={closeReminderModal}>Close</button>
          </div>

        </Modal>
      )}
      {renderDrugInfo()}
    </div>
  )
}

export default DrugAutocomplete
