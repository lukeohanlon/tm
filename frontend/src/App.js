import React, { useState, useEffect } from 'react';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MyMeds from './views/MyMeds'
import Navbar from './components/Navbar'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import { AuthProvider } from './authContext';
import SignIn from './views/SignIn'
import About from './views/About';
import Footer from './components/Footer';
import Contact from './views/Contact';
import TermsAndConditions from './views/TermsAndConditions';
import PrivacyPolicy from './views/PrivacyPolicy';
import MedicationList from './components/MedicationList';
import ScrollToTop from './components/ScrollToTop'


function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if(isMenuOpen) {
      document.body.classList.remove('stop-scrolling')
    } else if(window.matchMedia('(max-width: 768px)').matches && !isMenuOpen) {
      document.body.classList.add('stop-scrolling')
    }
  };

    useEffect(() => {
     
      const checkAuthenticationStatus = async () => {
       
        const isAuthenticated = true;
        setIsAuthenticated(isAuthenticated);
  
       
        setShowPopup(true);
  
       
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      };
  
      checkAuthenticationStatus();
    }, []);


  return (
    <Router>
      <AuthProvider>
      <ScrollToTop />
      <Navbar toggleMenu={() => toggleMenu()} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className={`main-content ${isMenuOpen ? 'pushed' : ''}`}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signin" exact element={<SignIn />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/tandc" exact element={<TermsAndConditions />} />
          <Route path="/privacy" exact element={<PrivacyPolicy />} />
          <Route path="/register" exact element={<Register />} />
          <Route path='/mymeds' element={<MedicationList />} />
        </Routes>
      </div>
      <Footer />
      </AuthProvider>
    </Router>
  )
}

export default App
