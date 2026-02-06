import React from 'react';

function Contact() {
  return (
    <div className="form-container">
      <header>
        <h1>Contact Us</h1>
        <p>Get in touch with our support team</p>
      </header>
      
      <div style={{margin: '30px 0'}}>
        <h3>Contact Information</h3>
        <p><strong>Email:</strong> safariousman02@gmail.com</p>
        <p><strong>Phone:</strong> +237 656 70 98 44</p>
        <p><strong>Address:</strong> CAMEROON, BUEA, MALINGO JUNCTION</p>
      </div>
      
      <h3>Send us a message</h3>
      <form>
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Your Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>

        <div style={{backgroundColor: 'lightblue', padding: '20px'}}>
            <h1>Contact Test</h1>
        </div>
        
        <button type="submit" className="btn">Send Message</button>
      </form>
      
      <div style={{marginTop: '30px', textAlign: 'center'}}>
        <a href="/" className="btn">Back to Home</a>
      </div>
    </div>
  );
}

export default Contact;