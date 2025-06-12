import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowRooms from './pages/Client/Booking/ShowRooms';
import Home from './pages/Home';
import SignUp from "./pages/Auth/SignUp";
import VehicleListing from './pages/Client/Vehicle/VehicleListing';
import ShowTherapyItems from './pages/Client/Therapy/ShowTherapyItems';
import AddFood from './pages/Admin/CRUDS/Food/AddFood';
import EditFood from './pages/Admin/CRUDS/Food/EditFood';
import ViewTherapiesPage from "./pages/Admin/CRUDS/Therapy/ViewTherapies";
import AddTherapyPage from "./pages/Admin/CRUDS/Therapy/AddTherapy";
import EditTherapyPage from "./pages/Admin/CRUDS/Therapy/EditTherapy";
import FoodClient from './pages/Client/Food/ShowFoods'


function App() {
  return (
    <Router>
      <Routes>
        {/* Home and Auth Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Client Routes */}
        <Route path="/rooms" element={<ShowRooms />} />
        <Route path="/therapy" element={<ShowTherapyItems />} />
        <Route path="/vehicles" element={<VehicleListing />} />
        
        {/* Admin Food Routes */}
        <Route path="/admin/foods/add" element={<AddFood />} />
        <Route path="/admin/foods/edit/:id" element={<EditFood />} />
        <Route path="/signup" element={<SignUp/>} ></Route>
        <Route path="/therapies" element={<ViewTherapiesPage />} />
        <Route path="/addtherapy" element={<AddTherapyPage />} />
        <Route path="/edittherapy" element={<EditTherapyPage />} />
        <Route path="/food" element={<FoodClient/>} />
      </Routes>
    </Router>
  );
}

export default App;