This response provides a skeletal structure for the `RegisterPage` component.  A full implementation would require a backend service for user authentication, database interaction, movie data, and ticket booking.  This example focuses on the frontend structure and styling using React and Tailwind CSS.  You'll need to fill in the backend integration and movie/ticket data handling.

```jsx
import React, { useState } from 'react';

const RegisterPage = () => {
  const [isRegistering, setIsRegistering] = useState(true); // True for registration, false for login
  const [authMethod, setAuthMethod] = useState('email'); // 'email' or 'phone'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); // Stores user data after login


  const handleRegister = async () => {
    setError(''); // Clear previous errors
    try {
      //  ---  Backend API call to register user ---
      //  Replace with your actual API call
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Registration failed');
      }
      const userData = await response.json();
      setUser(userData);
      setIsRegistering(false); // Switch to login after successful registration

    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    setError('');
    try {
      // --- Backend API call to login user ---
      // Replace with your actual API call.  Should handle OTP verification if phone is used.
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [authMethod]: authMethod === 'email' ? email : phone, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      setError(error.message);
    }
  };


  const handleOtpVerification = async () => {
    // --- Backend API call for OTP verification ---
    //  Replace with your actual API call
    console.log("OTP verification not implemented");
  };

  const handleProfileUpdate = async () => {
      // --- Backend API call to update user profile ---
      console.log("Profile update not implemented");
  };

  if(user){
      return(
          <div className="p-4">
              <h1>Welcome, {user.name}!</h1>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <button onClick={() => handleProfileUpdate()}>Update Profile</button>
              {/* Add movie browsing and ticket booking here */}
          </div>
      )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isRegistering ? 'Register' : 'Login'}
        </h2>
        <div className="mb-4">
          <label htmlFor="authMethod">Sign in with:</label>
          <select
            id="authMethod"
            value={authMethod}
            onChange={(e) => setAuthMethod(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="email">Email</option>
            <option value="phone">Phone Number</option>
          </select>
        </div>

        {isRegistering && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        <div className="mb-4">
          <input
            type={authMethod === 'email' ? 'email' : 'tel'}
            placeholder={authMethod === 'email' ? 'Email' : 'Phone Number'}
            value={authMethod === 'email' ? email : phone}
            onChange={(e) => (authMethod === 'email' ? setEmail(e.target.value) : setPhone(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {authMethod === 'phone' && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button onClick={handleOtpVerification} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Verify OTP</button>
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={isRegistering ? handleRegister : handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>

        <div className="mt-4 text-center">
          <button onClick={() => setIsRegistering(!isRegistering)} className="text-blue-500 hover:underline">
            {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
```

Remember to install the necessary packages:

```bash
npm install react react-dom tailwindcss postcss autoprefixer
```

And configure Tailwind CSS in your project.  This is a simplified example.  Error handling, input validation, and more robust backend integration are crucial for a production-ready application.  Consider using a library like `axios` for making API calls.  Also, for OTP verification, you'll need to integrate with a service that provides OTP generation and verification.
