import React, { useState } from 'react';

export default function Register({ onSwitchToSignIn }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('parent'); 

  const handleRegister = async () => {
  if (!firstName || !lastName || !email || !password || !role) {
    alert('Please fill all required fields.');
    return;
  }

  const userData = { firstName, lastName, email, password, role };

  try {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
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

      <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
        <div className="input-data">
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="parent">Parent</option>
            <option value="school">School</option>
            <option value="admin" style={{ display: 'none' }}>Admin</option>
          </select>
        </div>

        <button className="register-btn" type="submit" disabled={!firstName || !lastName || !email || !password}>Register</button>
      </form>

      <div className="register-container">
        <span style={{color:'#000000'}}>Already have an account? </span>
        <button onClick={onSwitchToSignIn} className='register-button'>Sign In</button>
      </div>
    </section>
  );
}
