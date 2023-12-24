import React, { useState } from 'react';
import { auth } from '../firebase.js'; // Import your Firebase configuration
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Successfully logged in, you can redirect to the next page or perform other actions.
      console.log('Successfully logged in!');
      
      localStorage.setItem('userInfo', JSON.stringify({
        email: email,
        password: password,
      }));
      
      navigate('/job-listing-creation');
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div align='center' className='my-12'>
      <div className='font-bold text-3xl'>Login</div>
      <form className='my-5' onSubmit={handleLogin}>
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
        <button className='bg-[#008080] p-2 m-2 rounded'>Login</button>
        {error && <p style={{ color: 'red' }}>Can't login, Incorrect email or password</p>}
      </form>
    </div>
  );
};

export default Login;