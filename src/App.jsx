import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowtimesPage from './pages/ShowtimesPage';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/movie/:id/showtimes" element={<ShowtimesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
