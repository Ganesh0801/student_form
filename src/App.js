import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    college: '',
    email: '',
    password: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
    }

    if (!formData.username.trim()) {
      tempErrors.username = 'Username is required';
    } else if (formData.username !== formData.username.toLowerCase()) {
      tempErrors.username = 'Username must be all lowercase';
    }

    if (!formData.college.trim()) {
      tempErrors.college = 'College is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      // Test Case 3 Fix: Exact error message string matched
      tempErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      tempErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.address.trim()) {
      tempErrors.address = 'Address is required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-card">
        <h1 className="form-title">Student Registration Form</h1>
        
        {submitted && (
          <div className="success-message">
            🎉 Registration Successful!
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label>College</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className={errors.college ? 'input-error' : ''}
            />
            {errors.college && <span className="error-text">{errors.college}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Address</label>
            {/* Test Case 2, 3, 4 Fix: Switched from <textarea> to <input> to match selector */}
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'input-error' : ''}
            />
            {errors.address && <span className="error-text">{errors.address}</span>}
          </div>

          {/* Test Case 1 Fix: Component labeled exactly "Register" */}
          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default App;