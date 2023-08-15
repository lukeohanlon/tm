import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <h1>Privacy Policy</h1>
      <p>Your privacy is important to us. It is MedMinder's policy to respect your privacy regarding any information we may collect from you through our application and website, <span className='blue'>www.medminder.com</span> and other sites we own and operate.</p>
      
      <h2>Information We Collect</h2>
      <p>We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey, fill out a form, or enter information on our site. The information collected includes your name, email address, mailing address, phone number, and payment details.</p>
      <p>We also use cookies to gather information about your browser, IP address, and browsing behavior.</p>
      
      <h2>How We Use Your Information</h2>
      <p>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey, surf the website, or use certain other site features in the following ways:</p>
      <ul className='list-centered'>
        <li>To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.</li>
        <li>To improve our website in order to better serve you.</li>
        <li>To allow us to better service you in responding to your customer service requests.</li>
        <li>To quickly process your transactions.</li>
        <li>To send periodic emails regarding your order or other products and services.</li>
      </ul>
      
      <h2>How We Protect Your Information</h2>
      <p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your information.</p>
      
      <h2>Third-Party Disclosure</h2>
      <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide you with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>

      <h2>Contact Us</h2>
      <p>If you have any questions about our privacy policy, please contact us at <a href="mailto:privacy@medminder.com">privacy@medminder.com</a>.</p>
    </div>
  );
}

export default PrivacyPolicy;
