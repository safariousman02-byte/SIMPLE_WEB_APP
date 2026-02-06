import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    course: ''
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    strength = Math.min(strength, 100);
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert('✅ Registration successful! User ID: ' + result.userId);
        navigate('/courses');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="password-strength">
            <span>Password strength: </span>
            <div className="strength-bar">
              <div 
                className="strength-fill" 
                style={{
                  width: `${passwordStrength}%`,
                  background: passwordStrength < 40 ? '#ff4444' : 
                             passwordStrength < 70 ? '#ffa700' : '#00C851'
                }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="course">Primary Course Interest:</label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
          >
            <option value="">Select a course</option>
            <option value="web">Web Development</option>
            <option value="python">Python Programming</option>
            <option value="database">Database Design</option>
            <option value="react">React.js</option>
          </select>
        </div>
        
        {error && <p style={{color: 'red'}}>{error}</p>}
        
        <button type="submit" className="btn">Create Account</button>
      </form>
      
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
}

export default Register;