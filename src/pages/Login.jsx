import React, { useState } from 'react';
import { auth } from '../firebase.js'; // Import your Firebase configuration

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Successfully logged in, you can redirect to the next page or perform other actions.
      console.log('Successfully logged in!');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div align='center' className='my-12'>
      <div className='font-bold text-3xl'>Login</div>
      <form className='my-5'>
        <div>
            <input
            type="email"
            placeholder='enter your email'
            className='bg-black border p-2 m-2 rounded'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
            <input
            type="password"
            placeholder='enter password'
            className='bg-black border p-2 m-2 rounded'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button className='bg-[#008080] p-2 m-2 rounded' onClick={handleLogin}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;