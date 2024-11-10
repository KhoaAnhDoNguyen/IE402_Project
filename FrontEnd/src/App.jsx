// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; // Import CSS nếu có
import Map from './components/Map'; // Import component Map
import Image from './components/Image'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Thêm route cho component Map */}
        <Route path="/map" element={<Map />} />
        <Route path="/image" element={<Image />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
