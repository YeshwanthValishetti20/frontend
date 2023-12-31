
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://65.1.114.170:8000/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Store the email in local storage and redirect the logged-in user to the home page
      const recipientEmail = localStorage.getItem('recipientEmail'); 
      localStorage.setItem('token', json.token);
      localStorage.setItem('recipientEmail', credentials.email); // Store the recipient's email
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <div
        className="flex items-center justify-center h-screen bg-no-repeat bg-cover bg-center bg-opacity-50"
        style={{ backgroundImage: 'url("https://wallpapercave.com/wp/wp2939892.jpg")' }} // Replace with your background image URL
      >
        <div className="border shadow-2xl shadow-emerald-900 rounded-lg w-3/5 flex flex-col items-center bg-white my-5">
          <h4 className="text-center font-bold text-2xl my-5 font-serif">Login</h4>
          <form onSubmit={onSubmit} className="w-full flex flex-col items-center">
            <div className="flex flex-col items-center w-full">
              <input
                type="text"
                className="border px-3 py-3 outline-none w-4/5 rounded my-5"
                placeholder="Enter your email"
                name="email"
                onChange={onChange}
              />
              <input
                type="password" // Change input type to password for password field
                className="border px-3 py-3 outline-none w-4/5 rounded my-5"
                placeholder="Enter your password"
                name="password"
                onChange={onChange}
              />
            </div>
            <button className="border bg-teal-500 text-white px-3 py-2 font-extrabold my-4">Login</button>
          </form>
          <p className="my-3">
            Don't have an account? <Link className="font-bold underline" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
