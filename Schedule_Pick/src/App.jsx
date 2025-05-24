import React from 'react';
import MapSection from './components/MapSection';
import PlaceListSlider from './components/PlaceListSlider';
import './App.css';

function App() {
  return (
    <div>
      {/* 헤더는 제외 */}
      <main>
        <MapSection />
      </main>
      <footer>
        <PlaceListSlider />
      </footer>
    </div>
  );
}

export default App; 