import React from "react";
import { Card, CardContent, Button } from "../../../components/ui";

type BookingSummaryProps = {
  room: {
    title: string;
    subtitle?: string;
    price: number;
  };
  checkin: string;
  checkout: string;
  guests: string | number;
  paymentMethod: string;
  roomCount: number;
  onFinish: () => void;
  onViewReservation?: () => void;
};

const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const BookingSummary: React.FC<BookingSummaryProps> = ({
  room,
  checkin,
  checkout,
  guests,
  paymentMethod,
  roomCount,
  onFinish,
  onViewReservation,
}) => {
  if (!room) return null;

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
    <div className="flex justify-center mt-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-1 text-green-700">
              Booking Confirmed!
            </h2>
            <p className="text-gray-500">Thank you for your reservation.</p>
          </div>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="font-semibold py-1">Room:</td>
                <td>
                  {room.title}
                  {room.subtitle ? ` - ${room.subtitle}` : ""}
                </td>
              </tr>
              <tr>
                <td className="font-semibold py-1">Dates:</td>
                <td>
                  {formatDate(checkin)} &rarr; {formatDate(checkout)}
                </td>
              </tr>
              <tr>
                <td className="font-semibold py-1">Nights:</td>
                <td>{nights}</td>
              </tr>
              <tr>
                <td className="font-semibold py-1">Rooms:</td>
                <td>{roomCount}</td>
              </tr>
              <tr>
                <td className="font-semibold py-1">Guests:</td>
                <td>{guests}</td>
              </tr>
              <tr>
                <td className="font-semibold py-1">Rate:</td>
                <td>
                  £{room.price} <span className="text-gray-400">/ night</span>
                </td>
              </tr>
              <tr>
                <td className="font-semibold py-1">Payment:</td>
                <td>{paymentMethod === "credit" ? "Credit Card" : "PayPal"}</td>
              </tr>
              <tr>
                <td className="font-semibold py-1">Total:</td>
                <td>
                  <span className="font-bold text-blue-700">£{total.toFixed(2)}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex gap-3 justify-center pt-2">
            {onViewReservation && (
              <Button variant="border" onClick={onViewReservation}>
                View Reservation
              </Button>
            )}
            <Button variant="border" className="ml-2" onClick={onFinish}>
              Done
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingSummary;
