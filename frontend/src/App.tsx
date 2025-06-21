import Home from './pages/Home';
import VehicleListing from './pages/Client/Vehicle/VehicleListing';
import ShowBookings from './pages/Admin/Management/Booking/ShowBookings';
import BookingDashboard from './pages/Admin/Management/Booking/ViewBooking';
import ClientDashboard from './pages/Client/ClientDashboard';
import BookingSummary from './pages/Client/Booking/BookingSummary';
import AddVehicle from './pages/Admin/CRUDS/Vehicle/AddVehicle';
import ViewAllVehicle from './pages/Admin/CRUDS/Vehicle/ViewAllVehicle';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowRooms from './pages/Client/Booking/BookingCalendar';
import SignUp from "./pages/Auth/SignUp";
import SignIn from './pages/Auth/SignIn';
import ViewTherapiesPage from "./pages/Admin/CRUDS/Therapy/ViewTherapies";
import AddTherapyPage from "./pages/Admin/CRUDS/Therapy/AddTherapy";
import EditTherapyPage from "./pages/Admin/CRUDS/Therapy/EditTherapy";
import AddTherapy from './pages/Admin/CRUDS/Therapy/AddTherapy';
import EditTherapy from './pages/Admin/CRUDS/Therapy/EditTherapy';
import FoodClient from './pages/Client/Food/ShowFoods'
import SpaDashboard from './pages/Client/Therapy/ShowTherapyItems';
import ClientDashboard_Bookings from "./pages/Client/ClientDashboards_Bookings";
import Profile from "./pages/Client/UserProfile";
import BookingCalendar from './pages/Client/Booking/BookingCalendar'
import ViewRentings from "./pages/Receiptionist/ViewRentings";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddFood from './pages/Admin/CRUDS/Food/AddFood'; 
import EditFood from './pages/Admin/CRUDS/Food/EditFood';
import FoodList from './pages/Admin/CRUDS/Food/FoodList';
import MakeBooking from './pages/Client/Booking/MakeBooking';
import ConfirmBooking from './pages/Client/Booking/ConfirmBooking';
import RoomsLayout from './pages/Client/Booking/RoomsLayout';
import ReceiptionistDashboard from './pages/Receiptionist/ReceiptionistDashboard';
import ShowOrderings from './pages/Admin/Management/Food/ShowOrderings';
import RoomListing from './pages/Admin/Management/Room/RoomListing';
import TherapyBookingHistory from './pages/Admin/Management/Therapy/TherapyBookingHistory';
import VehicleRentingHistory from './pages/Admin/Management/Vehicle/VehicleRentingHistory';
import AddRoom from './pages/Admin/CRUDS/Room/AddRoom';
import EditRoom from './pages/Admin/CRUDS/Room/EditRoom';
import RoomList from './pages/Admin/CRUDS/Room/RoomList';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard-bookings-client" element={<ClientDashboard_Bookings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rooms" element={<ShowRooms />} />
        <Route path="/signup" element={<SignUp/>} ></Route>
        <Route path="/therapies" element={<ViewTherapiesPage />} />
        <Route path="/addtherapy" element={<AddTherapyPage />} />
        <Route path="/edittherapy" element={<EditTherapyPage />} />
        <Route path="/food" element={<FoodClient/>} />
        <Route path="/calendar" element={<BookingCalendar />} />
        <Route path="/recieptionist-view-rentings" element={<ViewRentings />} />
        <Route path="/dashboard-admin" element={<AdminDashboard />} />
        <Route path="/vehicle-listing" element={<VehicleListing />} />
        <Route path="/show-bookings" element={<ShowBookings />} />
        <Route path="/admin/rooms" element={<RoomListing />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/view-all-vehicles" element={<ViewAllVehicle />} />
        <Route path="/admin/food/addfood" element={<AddFood />} />
        <Route path="/admin/food/editfood/:id" element={<EditFood />} />
        <Route path="/admin/food/list" element={<FoodList />} />
        <Route path="/admin/room/addroom" element={<AddRoom />} />
        <Route path='/admin/room/editroom/:id' element={<EditRoom />} />
        <Route path="/admin/room/list" element={<RoomList />} />
        <Route path="/show-bookings" element={<ShowBookings />} />
        <Route path="/add-therapy" element={<AddTherapy />} />
        <Route path="/edit-therapy" element={<EditTherapy />} />
        <Route path="/spa-dashboard" element={<SpaDashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/booking" element={<MakeBooking />} />
        <Route path="/booking-summary" element={<BookingSummary />} />
        <Route path="/confirm-booking" element={<ConfirmBooking />} />
        <Route path="/rooms-layout" element={<RoomsLayout />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/booking-dashboard" element={<BookingDashboard />} />
        <Route path="/receiptionist-dashboard" element={<ReceiptionistDashboard />} />
        <Route path="/admin/show-orderings" element={<ShowOrderings />} />
        <Route path="/admin/therapy-booking-history" element={<TherapyBookingHistory />} />
        <Route path="/admin/vehicle-renting-history" element={<VehicleRentingHistory />} />
      </Routes>
    </Router>
  );
}

export default App