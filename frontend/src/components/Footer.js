import React, {useState, useEffect} from 'react';
import '../index.css'
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';

emailjs.init('YOUR_USER_ID');


const Footer = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
  
    emailjs.sendForm('service_o758nq8', 'template_utsenxf', e.target, '8dbphUqwHbrkIwDFN')
      .then((result) => {
        console.log(result.text);
        setIsSubmitted(true)
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  
    e.target.reset();
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false)
      }, 2000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [isSubmitted])

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h3>Explore</h3>
          <ul>
          <Link to='/'><li className='flink'>Home</li></Link>
            <Link to='/tandc'><li className='flink'>Terms </li></Link>
            <Link to='/about'><li className='flink'>About Us</li></Link>
            <Link to='/contact'> <li className='flink'>Contact</li></Link>
          </ul>
        </div>
        <div className="footer-section foomobi">
          <h3>Useful Links</h3>
          <ul>
          <Link to='/tandc'><li className='flink'>Terms</li></Link>
            <Link to='/privacy'><li className='flink'>Privacy </li></Link>
            <li><a className='a-white' href="https://www.google.com/maps/place/World+Health+Organization"  target="_blank" rel="noopener noreferrer">Hospital</a></li>
            <li><a className='a-white' href="https://www.google.com/maps/place/Cleveland+Clinic" target="_blank" rel="noopener noreferrer">Visit Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Partners</h3>
          <ul>
            <li><a className='a-white' href="https://www.fda.com" target="_blank" rel="noopener noreferrer">Drug Info</a></li>
            <li><a className='a-white' href="https://www.google.com/maps/place/World+Health+Organization" target="_blank" rel="noopener noreferrer">Location</a></li>
            <li><a className='a-white' href="https://www.google.com/maps/place/Health+Service+Executive+Ireland" target="_blank" rel="noopener noreferrer">Partners</a></li>
            <li><a className='a-white' href="https://www.google.com/maps/place/Mayo+Clinic" target="_blank" rel="noopener noreferrer">Clinics</a></li>
          </ul>
        </div>
        {isSubmitted && (
        <div className="popupf">
          <h2>Sent Successfully</h2>
          <p>
            Thank you for reaching out!
            <br />
            We will get back to you shortly
          </p>
          <p></p>
        </div>
      )}
        <div className="footer-section news-sec">
          <h3 className='news-t'>Newsletter</h3>
          <p className='news-p'>Sign up for our newsletter to receive updates:</p>
          <form onSubmit={handleSubmit}>
  <input type="email" placeholder="Enter your email" name="email" />
  <button className='foot-btn' type="submit">Subscribe</button>
</form>

        </div>
      </div>
      <div className="footer-bottom">
        <p >&copy; 2023 | MedMinder | All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

