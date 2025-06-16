import Home from './pages/Home';
import VehicleListing from './pages/Client/Vehicle/VehicleListing';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowRooms from './pages/Client/Booking/BookingCalendar';
import Home from './pages/Home';
import SignUp from "./pages/Auth/SignUp";
import ViewTherapiesPage from "./pages/Admin/CRUDS/Therapy/ViewTherapies";
import AddTherapyPage from "./pages/Admin/CRUDS/Therapy/AddTherapy";
import EditTherapyPage from "./pages/Admin/CRUDS/Therapy/EditTherapy";
import FoodClient from './pages/Client/Food/ShowFoods'
import ClientDashboard_Bookings from "./pages/Client/ClientDashboards_Bookings";
import ClientDashboard from "./pages/Client/ClientDashboard";
import Profile from "./pages/Client/UserProfile";
import BookingCalendar from './pages/Client/Booking/BookingCalendar'
import ViewRentings from "./pages/Receiptionist/ViewRentings";
import AdminDashboard from "./pages/Admin/AdminDashboard";



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard-bookings-client" element={<ClientDashboard_Bookings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard-client" element={<ClientDashboard />} />
        <Route path="/rooms" element={<ShowRooms />} />
        <Route path="/signup" element={<SignUp/>} ></Route>
        <Route path="/therapies" element={<ViewTherapiesPage />} />
        <Route path="/addtherapy" element={<AddTherapyPage />} />
        <Route path="/edittherapy" element={<EditTherapyPage />} />
        <Route path="/food" element={<FoodClient/>} />
        <Route path="/calendar" element={<BookingCalendar />} />
        <Route path="/recieptionist-view-rentings" element={<ViewRentings />} />
        <Route path="/dashboard-admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App