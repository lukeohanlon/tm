import React from 'react'
import img from '../media/ab.jpg'

const About = () => {
  return (
      <div className="about-page">
        <header className="header">
          <h1 className="site-title">
            Welcome to MedMinder - Your Personal Medication Tracker
          </h1>
          <p className="tagline2">
            At MedMinder, we are dedicated to helping you manage your
            medications with ease and precision. Our site is designed to
            streamline the process of medication tracking, ensuring that you
            never miss a dose and have all the information you need at your
            fingertips.
          </p>
          <img
            src={img}
            alt="About Page Image"
            className="about-image"
          />
        </header>
        <section className="about-content">
          <h2>Our Mission</h2>
          <p>
            MedMinder was founded with the mission to simplify medication
            management for individuals and caregivers. Our team of healthcare
            professionals and developers combined their expertise to create a
            powerful tool that ensures you never miss a dose again.
          </p>

          <h2>About MedMinder</h2>
          <p>
            MedMinder At MedMinder, we are dedicated to helping you manage your
            medications with ease and precision. Our site is designed to
            streamline the process of medication tracking, ensuring that you
            never miss a dose and have all the information you need at your
            fingertips.
            MedMinder was founded with the mission to simplify medication
            management for individuals and caregivers. Our team of healthcare
            professionals and developers combined their expertise to create a
            powerful tool that ensures you never miss a dose again.
          </p>

          <h2>Our Team</h2>
          <p>
            Behind MedMinder is a dedicated team of developers and healthcare
            enthusiasts who are passionate about improving medication
            management. We are committed to delivering a reliable and
            user-friendly experience that enhances your well-being.
          </p>

          <h2>Get Started</h2>
          <p>
            Join MedMinder today and take control of your medication routine.
            Experience the peace of mind that comes with organized medication
            tracking and never miss a dose again. Thank you for choosing
            MedMinder as your trusted medication tracking companion. We look
            forward to being a part of your health journey. Stay healthy and
            informed! The MedMinder Team
          </p>

          

          <h2>Key Features</h2>
          <ul className='list-center'>
            <li className='list-item-center'>Medication dose tracking and history</li>
            <li className='list-item-center'>Customizable reminder alerts</li>
            <li className='list-item-center'>User-friendly interface for all ages</li>
            <li className='list-item-center'>Secure and private</li>
          </ul>

         
        </section>
     

      <div>
      <h2> What We Offer</h2>
      <div className="grouped-padding">
        <p>
          {' '}
          <span className="blue">Effortless Medication Tracking:</span> With
          MedMinder, you can effortlessly track your medications, set reminders
          for doses, and monitor your progress. Say goodbye to the hassle of
          forgetting a dose or struggling to keep track of complex medication
          schedules. 
        </p>
        <p>

          <span className="blue">Comprehensive Medication Details:</span> We
          provide detailed information about each medication you're taking,
          including dosage instructions, potential side effects, and
          interactions. Our aim is to ensure your safety and empower you with
          knowledge. 
        </p>
        <p>
          {' '}
          <span className="blue">Customizable Reminders:</span> Tailor your
          medication reminders to your unique schedule. Whether you need
          reminders for specific times or recurring intervals, our site has you
          covered. 
        </p>
        <p>
          {' '}
          <span className="blue">User-Friendly Interface:</span> Our site is
          designed with you in mind. The user-friendly interface makes it easy
          to add medications, update your schedule, and access essential
          information.  </p>{' '}
          </div>
          <h2> Get Started</h2>
          <p> Join MedMinder today and take control of
          your medication routine. Experience the peace of mind that comes with
          organized medication tracking and never miss a dose again. Thank you
          for choosing MedMinder as your trusted medication tracking companion.
          We look forward to being a part of your health journey. </p>
       
        <h2>Contact Us</h2>
          <p>
            Have questions or feedback? Reach out to us at
            support@medminder.com. We'd love to hear from you!
          </p>
        <h3 className="blue center">
          {' '}
          Stay healthy and informed! -The MedMinder Team{' '}
        </h3>
      </div>
      </div>
  )
}

export default About
