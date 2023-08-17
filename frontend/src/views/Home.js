import React from 'react'
import { Link } from 'react-router-dom'
import img from '../media/hm.jpg'

const Home = () => {
  return (
    <div className="home">
      <header className="header">
        <div className="banner-container">
          <img src={img} alt="Banner" className="banner-image" />
          <div className="banner-overlay">
            <h1 className="app-title">Welcome to MedMinder</h1>
            <p className="tagline">
              {' '}
              Join today! - Effortlessly keep track of your medication doses and
              schedules.
            </p>
            <Link to="/signin">
            <button className="cta-btn">Sign Up</button>
            </Link>
          </div>
        </div>
      </header>
      <div className="home-top">
        <h1 className="title-home">Get Started Today</h1>
        <p className='head-boost '>
          Welcome to MedMinder, your all-in-one solution for effortless
          medication management. Say goodbye to the stress of tracking your
          medications and hello to a healthier, more organized you.
        </p>
      </div>
      <section className="features">
        <h2 className="section-title">Features at a Glance</h2>
        <div className="features1">
          <div className="feature-card">
            <span className="white title-blue">Medication Tracking:</span>
            <p>
              Effortlessly keep track of your medication doses and schedules.
            </p>
          </div>
          <div className="feature-card">
            <span className="white title-blue">Reminder Alerts:</span>
            <p>Receive timely reminders to take your medications.</p>
          </div>
          <div className="feature-card">
            <span className="white title-blue">Easy to Use:</span>
            <p>
              Intuitive interface that makes managing your medications a breeze.
            </p>
          </div>
        </div>
      </section>
      <section className="why-choose">
        <h2 className="section-title ">Why Choose MedMinder</h2>
        <p className='head-boost1 grouped-padding2 wi'>
          MedMinder is dedicated to providing you with a seamless medication
          tracking experience. With our user-friendly interface and powerful
          features, you'll never miss a dose again.
        </p>
        <ul className='head-boost grouped-padding2'>
          <li>
            <p className='wi'>
            Simplify Your Routine Managing multiple medications can be
            overwhelming. We're here to simplify your routine and help you stay
            on track effortlessly.
            </p>
          </li>
          <li>
          <p className='wi'>
            Put Your Health First Your well-being is our priority. By providing
            accurate medication information and reliable reminders, we empower
            you to prioritize your health.
            </p>
          </li>
          <li>
          <p className='wi'>
            Stay Organized Anywhere Access your medication information and
            reminders from anywhere, whether you're at home or on the go. Our
            app syncs seamlessly across devices.
            </p>
          </li>
        </ul>
      </section>
      <section className="get-started">
        <h2 className="section-title">Get Started Today</h2>
        <p className='head-boost'>
        <span className="title-blue"> Start managing your medications with ease. Download MedMinder and take
          control of your health journey.</span>
        </p>
        <Link to="/signin">
        <button className="get-started-btn">Join Now</button>
        </Link>
      </section>
    </div>
  )
}

export default Home
