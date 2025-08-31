import React, { useState } from 'react';

export default function Register({ onSwitchToSignIn }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'parent',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, role } = formData;
    if (!firstName || !lastName || !email || !password || !role) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registration successful!');
      } else {
        const error = await response.json();
        alert(error.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong.');
    }
  };

  const { firstName, lastName, email, password, role } = formData;

  return (
    <section className="register" style={{ padding: '20px' }}>
      <div className="register-heading">Create your account</div>

      <a href="YOUR_GOOGLE_OAUTH_URL" className="google-signin">
        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" />
        <span className="account">Sign in with Google</span>
      </a>

      <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
        <div style={{ flex: 1, borderBottom: "0.5px solid #b0b6c0ff" }} />
        <div style={{ padding: "0 10px", color:'#9CA3AF' }}>OR</div>
        <div style={{ flex: 1, borderBottom: "0.5px solid #b0b6c0ff" }} />
      </div>

      <form onSubmit={handleRegister}>
        <div className="input-data">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />

          <select name="role" value={role} onChange={handleChange} required>
            <option value="parent">Parent</option>
            <option value="school">School</option>
          </select>
        </div>

        <button className="register-btn" type="submit" disabled={!firstName || !lastName || !email || !password}>
          Register
        </button>
      </form>

      <div className="register-container">
        <span style={{color:'#000000'}}>Already have an account? </span>
        <button onClick={onSwitchToSignIn} className="register-button">Sign In</button>
      </div>
    </section>
  );
}
