import React, { useEffect, useState, useRef } from "react";
import {
  useCreateBookingMutation,
  useUpdateBookingMutation,
} from "../../redux/api/bookingApi";
import toast from "react-hot-toast";
import { useGetUsersQuery } from "../../redux/api/adminApi";
import { useGetFlightTypesQuery } from "../../redux/api/flightTypeApi";

const AddBookingForm = ({ setShowForm, refetch, booking }) => {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    user: "",
    toPlace: "",
    fromPlace: "",
    travelDate: "",
    travelTime: "",
    flightType: "",
    status: "pending",
    remarks: "",
    totalAmount: 0,
  });

  useEffect(() => {
    if (booking && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [booking]);

  useEffect(() => {
    if (booking) {
      setForm({
        user: booking.user?._id || "",
        toPlace: booking.toPlace || "",
        fromPlace: booking.fromPlace || "",
        travelDate: booking.travelDate || "",
        travelTime: booking.travelTime || "",
        flightType: booking.flightType || "",
        status: booking.status || "pending",
        remarks: booking.remarks || "",
        totalAmount: booking.totalAmount || 0,
      });
    }
  }, [booking]);

  const { data: users } = useGetUsersQuery();
  const { data: flightTypes } = useGetFlightTypesQuery();
  const [createBooking] = useCreateBookingMutation();
  const [updateBooking] = useUpdateBookingMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (
      !form.user ||
      !form.fromPlace ||
      !form.toPlace ||
      !form.travelDate ||
      !form.travelTime ||
      !form.flightType ||
      !form.totalAmount
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      //   const payload = {
      //     ...form,
      //     totalAmount: parseFloat(form.totalAmount),
      //   };

      const payload = {
        ...form,
        user: form.user?._id || form.user, // send ID only
      };

      // await createBooking(payload).unwrap();
      if (booking?._id) {
        // Update
        await updateBooking({ id: booking._id, data: payload });
      } else {
        // Create
        await createBooking(payload);
      }
      toast.success(`Booking ${booking ? "updated" : "created"} successfully`);
      refetch();
      setShowForm(false);
    } catch (err) {
      console.error("Error submitting form", err);

      toast.error("Failed to create booking");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="border p-3 mb-4 bg-light"
    >
      <div className="row g-3">
        <div className="col-md-4">
          <select
            className="form-select"
            value={form.user}
            onChange={(e) => setForm({ ...form, user: e.target.value })}
            required
          >
            <option value="">Select Traveler</option>
            {users?.users?.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="From Place"
            value={form.fromPlace}
            onChange={(e) => setForm({ ...form, fromPlace: e.target.value })}
            required
          />
        </div>

        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="To Place"
            value={form.toPlace}
            onChange={(e) => setForm({ ...form, toPlace: e.target.value })}
            required
          />
        </div>

        <div className="col-md-4">
          <input
            type="date"
            className="form-control"
            value={form.travelDate}
            onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
            required
          />
        </div>

        <div className="col-md-4">
          <input
            type="time"
            className="form-control"
            value={form.travelTime}
            onChange={(e) => setForm({ ...form, travelTime: e.target.value })}
            required
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={form.flightType}
            onChange={(e) => setForm({ ...form, flightType: e.target.value })}
            required
          >
            <option value="">Select Flight Type</option>
            {flightTypes?.flightTypes?.map((f) => (
              <option key={f._id} value={f._id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Total Amount"
            value={form.totalAmount}
            onChange={(e) => setForm({ ...form, totalAmount: e.target.value })}
            required
          />
        </div>

        <div className="col-md-8">
          <textarea
            className="form-control"
            rows="2"
            placeholder="Remarks"
            value={form.remarks}
            onChange={(e) => setForm({ ...form, remarks: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Status</label>
          <select
            className="form-control"
            name="status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            required
          >
            <option value="">-- Select Status --</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="col-md-12 d-flex gap-2 mt-2">
          <button type="submit" className="btn btn-success">
            Submit Booking
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddBookingForm;
