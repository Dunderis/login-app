import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent form from refreshing the page
    
    // Basic validation
    if (email === '' || password === '') {
      setError('Please fill in both fields');
      return;
    }

    // Simulate login (replace with actual login logic)
    if (email === 'aa@gmail.com' && password === 'yes') {
      alert('Login successful!');
      // Redirect or set logged-in state
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
