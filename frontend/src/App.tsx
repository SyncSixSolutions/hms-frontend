import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowRooms from './pages/Client/Booking/ShowRooms';
import Home from './pages/Home';
import SignUp from "./pages/Auth/SignUp";
import ViewTherapiesPage from "./pages/Admin/CRUDS/Therapy/ViewTherapies";
import AddTherapyPage from "./pages/Admin/CRUDS/Therapy/AddTherapy";
import EditTherapyPage from "./pages/Admin/CRUDS/Therapy/EditTherapy";
import FoodClient from './pages/Client/Food/ShowFoods'
import ClientDashboard_Bookings from "./pages/Client/ClientDashboards_Bookings";
import ClientDashboard from "./pages/Client/ClientDashboard";
import Profile from "./pages/Client/UserProfile";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboardbooking" element={<ClientDashboard_Bookings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
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
