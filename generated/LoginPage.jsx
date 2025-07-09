This example requires you to have Node.js, npm (or yarn), and React with Tailwind CSS set up.  You'll need to install `react-router-dom` for routing:

```bash
npm install react-router-dom
```

Here's the code:

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Basic validation (replace with your actual authentication logic)
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    // Simulate API call - replace with your actual authentication
    try {
      const response = await fetch('/api/login', { // Replace '/api/login' with your backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Authentication failed.');
      } else {
        // Successful login - redirect to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
```

**To use this:**

1.  **Create a `/api/login` endpoint:**  This example uses a placeholder `/api/login` endpoint. You'll need to create a backend (e.g., using Node.js, Python/Flask, etc.) that handles authentication and responds appropriately (e.g., with a JSON object indicating success or failure).  This backend should validate the email and password against your user database.  A simple example (Node.js with Express):

```javascript
// server.js
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Replace this with your actual authentication logic
  if (email === 'test@example.com' && password === 'password') {
    res.json({ success: true });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(3001, () => console.log('Server listening on port 3001'));
```

2.  **Set up routing:**  In your main app file (e.g., `App.js`), import and use `BrowserRouter`, `Route`, and `Routes` from `react-router-dom` to define routes for the login page and the dashboard.  Remember to create a placeholder component for your `/dashboard` route.

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard'; //Create a dummy component for now.

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

3.  **Run your app:** Start your backend server and then run your React development server.


Remember to replace the placeholder authentication logic with your actual implementation.  This improved example includes better error handling and uses Tailwind CSS for styling.  Consider adding more robust input validation and security measures in a production environment.
