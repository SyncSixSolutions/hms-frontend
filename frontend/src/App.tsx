import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VehicleListing from './pages/Client/Vehicle/VehicleListing';
import ShowTherapyItems from './pages/Client/Therapy/ShowTherapyItems';
import AddFood from './pages/Admin/CRUDS/Food/AddFood';
import EditFood from './pages/Admin/CRUDS/Food/EditFood';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/therapy" element={<ShowTherapyItems />} />
        <Route path="/vehicles" element={<VehicleListing />} />
        <Route path="/admin/foods/add" element={<AddFood />} />
        <Route path="/admin/foods/edit" element={<EditFood />} />
      </Routes>
    </Router>
  )
}

export default App