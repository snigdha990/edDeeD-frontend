import React, { useState } from 'react';

export default function SignIn({ onClose, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    console.log('Signing in with:', { email, password });
    alert('Sign in successful!');
    onClose?.();
  };

  return (
    <section className="sign-in" style={{ padding: '20px' }}>
      <div className="sign-in-heading">Sign In to your account</div>
      <a href="YOUR_GOOGLE_OAUTH_URL" className="google-signin">
        <img  src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" />
        <span className="account">Sign in with Google</span>
      </a>

      <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
      <div style={{ flex: 1, borderBottom: "0.5px solid #b0b6c0ff"}} />
      <div style={{ padding: "0 10px", color:'#9CA3AF' }}>OR</div>
      <div style={{ flex: 1, borderBottom: "0.5px solid #b0b6c0ff" }} />
     </div>

      <div className="input-data">
        <label htmlFor='email'>
            Email<span style={{ color: '#DC2626' }}>*</span>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor='password'>
            Password<span style={{ color: '#DC2626' }}>*</span>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      <button className="signIn-btn" onClick={handleSignIn}>Sign In</button>
      <a href="https://eddeed.com/users/forgot-password" style={{ color: '#DC2626', fontSize: '14px' }}>Forgot Password?</a>
      <div className="register-container">
        <span style={{color:'#000000'}}>Don't have an account? </span>
        <button onClick={onSwitchToRegister}className='register-button'>Register</button>
      </div>
    </section>
  );
}
