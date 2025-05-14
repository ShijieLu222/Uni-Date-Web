import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<div>Login</div>} />
      </Routes>
    </Router>
  );
}

export default App;
