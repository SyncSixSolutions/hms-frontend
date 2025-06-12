import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowRooms from './pages/Client/Booking/ShowRooms';
import Home from './pages/Home';
import SignUp from "./pages/Auth/SignUp";
import ViewTherapiesPage from "./pages/Admin/CRUDS/Therapy/ViewTherapies";
import AddTherapyPage from "./pages/Admin/CRUDS/Therapy/AddTherapy";
import EditTherapyPage from "./pages/Admin/CRUDS/Therapy/EditTherapy";
import FoodClient from './pages/Client/Food/ShowFoods'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<ShowRooms />} />
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
