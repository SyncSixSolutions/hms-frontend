import React, { useState } from "react";
import { Button, Card, CardContent, Input } from "../../../components/ui";

type ConfirmBookingProps = {
  room: {
    title: string;
    subtitle?: string;
    price: number;
  };
  checkin: string;
  checkout: string;
  guests: string;
  roomCount: number;
  onConfirm: (paymentMethod: string) => void;
  onBack: () => void;
};

const PaymentComponent: React.FC<{ method: string; onPaid: () => void }> = ({
  method,
  onPaid,
}) => (
  <div className="mt-6 space-y-4">
    <div className="text-lg font-semibold text-blue-700">
      Payment - {method === "credit" ? "Credit Card" : "PayPal"}
    </div>
    {method === "credit" ? (
      <div className="space-y-2">
        <Input type="text" placeholder="Card Number" className="w-full" />
        <div className="flex gap-2">
          <Input type="text" placeholder="MM/YY" className="w-1/2" />
          <Input type="text" placeholder="CVC" className="w-1/2" />
        </div>
        <Input type="text" placeholder="Cardholder Name" className="w-full" />
      </div>
    ) : (
      <div className="space-y-2">
        <Input type="email" placeholder="PayPal Email" className="w-full" />
      </div>
    )}
    <Button className="w-full bg-blue-700 text-white mt-4" onClick={onPaid}>
      Pay Now
    </Button>
  </div>
);

const ConfirmBooking: React.FC<ConfirmBookingProps> = ({
  room,
  checkin,
  checkout,
  guests,
  roomCount,
  onConfirm,
  onBack,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [showPayment, setShowPayment] = useState(false);

  if (!room) return null;

  // Calculate number of nights
  const nights =
    checkin && checkout
      ? Math.max(
          1,
          Math.ceil(
            (new Date(checkout).getTime() - new Date(checkin).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 1;

  const total = room.price * nights * roomCount;

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-xl shadow-2xl rounded-2xl border-0 bg-white/95">
        <CardContent className="space-y-6 p-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">
            Confirm Your Booking
          </h2>
          <div className="space-y-2">
            <div>
              <span className="font-semibold text-gray-700">Room:</span>{" "}
              {room.title} {room.subtitle ? `- ${room.subtitle}` : ""}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Dates:</span>{" "}
              {checkin} to {checkout}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Guests:</span>{" "}
              {guests}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Rooms:</span>{" "}
              {roomCount}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Nights:</span>{" "}
              {nights}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Rate:</span> £
              {room.price} per night
            </div>
            <div>
              <span className="font-semibold text-gray-700">Total:</span>{" "}
              <span className="text-lg font-bold text-blue-700">
                £{total.toFixed(2)}
              </span>
            </div>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Payment Method:</span>
            <div className="flex gap-6 mt-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <Input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "credit"}
                  onChange={() => setPaymentMethod("credit")}
                />
                <span>Credit Card</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                />
                <span>PayPal</span>
              </label>
            </div>
          </div>
          {!showPayment ? (
            <div className="flex gap-4 mt-6 justify-end">
              <Button variant="border" onClick={onBack} className="rounded-lg px-6 py-2">
                Back
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold rounded-lg px-8 py-2"
                onClick={() => setShowPayment(true)}
              >
                Continue to Payment
              </Button>
            </div>
          ) : (
            <PaymentComponent method={paymentMethod} onPaid={() => onConfirm(paymentMethod)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmBooking;
