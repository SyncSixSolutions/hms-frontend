import React, { useState } from "react";
import ShowRooms from "./ShowRooms";
import ConfirmBooking from "./ConfirmBooking";
import BookingSummary from "./BookingSummary";
import StepIndicator from "./StepIndicator";
import NavBarComponent from "../../../components/layout/NavBarComponent";
import { useNavigate } from "react-router-dom";

const steps = ["Select Room", "Confirm & Pay", "Summary"];

const MakeBooking: React.FC = () => {
  const [step, setStep] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [roomCount, setRoomCount] = useState(1);
  const navigate = useNavigate();

  const handleRoomSelect = (
    room: any,
    checkin: string,
    checkout: string,
    guests: string,
    count: number
  ) => {
    setSelectedRoom(room);
    setCheckin(checkin);
    setCheckout(checkout);
    setGuests(guests);
    setRoomCount(count);
    setStep(1);
  };

  const handleConfirm = (method: string) => {
    setPaymentMethod(method);
    setStep(2);
  };

  const handleFinish = () => {
    setStep(0);
    setSelectedRoom(null);
    setCheckin("");
    setCheckout("");
    setGuests("");
    setPaymentMethod("");
    setRoomCount(1);
  };

  return (
    <div>
      <NavBarComponent
        role="guest"
        isAuthenticated={false}
        forWhat="signIn"
        activeLink="Rooms"
        onProfileClick={() => console.log("Profile clicked")}
        profileImageUrl="/path-to-user.png"
      />
      <StepIndicator currentStep={step} steps={steps} />
      <div className="max-w-5xl mx-auto">
        {step === 0 && <ShowRooms onRoomSelect={handleRoomSelect} />}
        {step === 1 && selectedRoom && (
          <ConfirmBooking
            room={selectedRoom}
            checkin={checkin}
            checkout={checkout}
            guests={guests}
            roomCount={roomCount}
            onConfirm={handleConfirm}
            onBack={() => setStep(0)}
          />
        )}
        {step === 2 && selectedRoom && (
          <BookingSummary
            room={selectedRoom}
            checkin={checkin}
            checkout={checkout}
            guests={guests}
            paymentMethod={paymentMethod}
            roomCount={roomCount}
            onFinish={handleFinish}
            onViewReservation={() => navigate("/my-reservations")}
          />
        )}
      </div>
    </div>
  );
};

export default MakeBooking;
