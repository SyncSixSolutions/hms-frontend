// import Home from './pages/Home';
import ClientDashboard from "./pages/Client/ClientDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowRooms from './pages/Client/Booking/ShowRooms';
import Home from './pages/Home';

import SignUp from "./pages/Auth/SignUp";
import VehicleListing from './pages/Client/Vehicle/VehicleListing';
import ShowTherapyItems from './pages/Client/Therapy/ShowTherapyItems';


function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<ShowRooms />} />
        <Route path="/signup" element={<SignUp/>} ></Route>
      </Routes>
    </Router>
  );
}

export default App;;
