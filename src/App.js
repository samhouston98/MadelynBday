import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import YearPage from './components/YearPage';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/year/:year" element={<YearPage />} />
      </Routes>
    </Router>
  );
}

export default App;
