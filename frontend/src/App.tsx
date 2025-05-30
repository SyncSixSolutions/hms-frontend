import React, { useState } from 'react';
import Home from './pages/Home';
import VehicleListing from './pages/Client/Vehicle/VehicleListing';
import TherapyAdmin from './pages/Admin/CRUDS/Therapy/TherapyAdmin';
import AddItem from './pages/Admin/CRUDS/Therapy/AddItem';

function App() {
  const [currentView, setCurrentView] = useState<'therapyAdmin' | 'addItem'>('therapyAdmin');

  const handleNavigateToAddItem = () => {
    setCurrentView('addItem');
  };

  const handleNavigateBackToTherapyAdmin = () => {
    setCurrentView('therapyAdmin');
  };

  return (
    <div>
      {currentView === 'therapyAdmin' && (
        <TherapyAdmin onNavigateToAdd={handleNavigateToAddItem} />
      )}
      {currentView === 'addItem' && (
        <AddItem onNavigateBack={handleNavigateBackToTherapyAdmin} />
      )}
    </div>
  );
}

export default App;
