<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VehicleListing from './pages/Client/Vehicle/VehicleListing';
import ShowTherapyItems from './pages/Client/Therapy/ShowTherapyItems';
import AddFood from './pages/Admin/CRUDS/Food/AddFood';
import EditFood from './pages/Admin/CRUDS/Food/EditFood';
=======
import Home from './pages/Home';
import VehicleListing from './pages/Client/Vehicle/VehicleListing';
>>>>>>> 955790b5c0165d4826111486a95dfb70509f1373

function App() {
  return (
<<<<<<< HEAD
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/therapy" element={<ShowTherapyItems />} />
        <Route path="/vehicles" element={<VehicleListing />} />
        <Route path="/admin/foods/add" element={<AddFood />} />
        <Route path="/admin/foods/edit" element={<EditFood />} />
      </Routes>
    </Router>
=======
    <div>
          <Home />
        {/* <VehicleListing /> */}
    </div>
>>>>>>> 955790b5c0165d4826111486a95dfb70509f1373
  )
}

export default App