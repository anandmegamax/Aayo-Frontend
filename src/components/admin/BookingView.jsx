import React from "react";
import { useParams } from "react-router-dom";
import { useGetBookingByIdQuery } from "../../redux/api/bookingApi";

const BookingView = () => {
  const { id } = useParams();
  const { data: booking } = useGetBookingByIdQuery(id);

  if (!booking) return <p>Loading...</p>;

  const balance = booking.totalAmount;

  return (
    <div className="container mt-4">
      <h2>Booking Details</h2>
      <p>
        <strong>Name:</strong> {booking.user.name}
      </p>
      <p>
        <strong>Email:</strong> {booking.user.email}
      </p>
      <p>
        <strong>Phone:</strong> {booking.user.mobile}
      </p>
      <p>
        <strong>From:</strong> {booking.fromPlace}
      </p>
      <p>
        <strong>To:</strong> {booking.toPlace}
      </p>
      <p>
        <strong>Date:</strong> {booking.travelDate}
      </p>
      <p>
        <strong>Time:</strong> {booking.travelTime}
      </p>
      <p>
        <strong>Status:</strong> {booking.status}
      </p>
      <p>
        <strong>Flight Type:</strong> {booking.flightType}
      </p>
      <p>
        <strong>Total:</strong> ₹{booking.totalAmount}
      </p>

      <p>
        <strong>Balance:</strong> ₹{balance}
      </p>
    </div>
  );
};

export default BookingView;
