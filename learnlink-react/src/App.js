import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './learnlink-styles.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Courses from './components/Courses';
import Login from './components/Login';
import Register from './components/Register';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <footer>
          <div className="footer-content">
            <div className="footer-section">
              <h3>LearnLink</h3>
              <p>Your virtual classroom platform for modern education.</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <p><a href="/courses">Browse Courses</a></p>
              <p><a href="/contact">Contact Us</a></p>
              <p><a href="/login">Student Login</a></p>
            </div>
            <div className="footer-section">
              <h3>Contact Info</h3>
              <p><strong>Email:</strong> safariousman02@gmail.com</p>
              <p><strong>Phone:</strong> +237 656 70 98 44</p>
              <p><strong>Address:</strong> CAMEROON, BUEA, MALINGO JUNCTION</p>
            </div>
          </div>
          <p style={{marginTop: '2rem', opacity: '0.8'}}>&copy; 2024 LearnLink. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;