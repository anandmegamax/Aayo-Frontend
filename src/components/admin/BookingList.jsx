import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import {
  useGetBookingsQuery,
  useDeleteBookingMutation,
} from "../../redux/api/bookingApi";
import toast from "react-hot-toast";
import AddBookingForm from "./AddBookingForm";
import AddPaymentForm from "./AddPaymentForm";

const BookingList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editBooking, setEditBooking] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { data, isLoading, refetch } = useGetBookingsQuery();
  const [deleteBooking] = useDeleteBookingMutation();
  const bookings = data?.bookings || [];

  console.log("Bookings data:", bookings);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteBooking(id).unwrap();
        toast.success("Deleted successfully");
        refetch();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  const filteredBookings = useMemo(() => {
    if (!searchTerm.trim()) return bookings;

    return bookings.filter((b) => {
      const target =
        `${b.user?.name} ${b.user?.email} ${b.user?.mobile} ${b.bookingType} ${b.status} ${b.fromPlace} ${b.toPlace}`.toLowerCase();
      return target.includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, bookings]);

  const columns = [
    {
      name: "Traveler",
      selector: (row) => row.user?.name,
      sortable: true,
      center: true,
    },
    {
      name: "Email",
      selector: (row) => row.user?.email,
      sortable: true,
      center: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.user?.mobile,
      sortable: true,
      center: true,
    },
    {
      name: "Flight Type",
      selector: (row) => row.flightType?.name,
      sortable: true,
      center: true,
    },
    {
      name: "Booking Type",
      selector: (row) => row.bookingType,
      sortable: true,
      cell: (row) => (
        <span
          className={`badge bg-${
            row.bookingType === "normal" ? "primary" : "secondary"
          }`}
        >
          {row.bookingType}
        </span>
      ),
      center: true,
    },
    {
      name: "From–To",
      selector: (row) => `${row.fromPlace} → ${row.toPlace}`,
      center: true,
    },
    {
      name: "Date",
      selector: (row) => row.travelDate,
      sortable: true,
      center: true,
    },
    {
      name: "Time",
      selector: (row) => row.travelTime,
      sortable: true,
      center: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`badge bg-${
            row.status === "confirmed"
              ? "success"
              : row.status === "cancelled"
              ? "danger"
              : "warning"
          }`}
        >
          {row.status}
        </span>
      ),
      center: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="dropdown">
          <button
            className="btn btn-sm btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Actions
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setEditBooking(row);
                  setShowForm(true);
                  setShowPayment(false);
                }}
              >
                Edit
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleDelete(row._id)}
              >
                Delete
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setSelectedBooking(row);
                  setShowForm(false);
                  setShowPayment(true);
                }}
              >
                Add Payment
              </button>
            </li>
          </ul>
        </div>
      ),
      ignoreRowClick: true,
      allowoverflow: true,
      button: true,
      center: true,
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Bookings</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditBooking(null);
            setShowForm(!showForm);
            setShowPayment(false);
          }}
        >
          {showForm ? "Close Form" : "Add Booking"}
        </button>
      </div>

      {showForm && (
        <AddBookingForm
          booking={editBooking}
          setShowForm={() => setShowForm(false)}
          refetch={refetch}
        />
      )}

      {showPayment && selectedBooking && (
        <AddPaymentForm
          booking={selectedBooking}
          onClose={() => setShowPayment(false)}
          refetch={refetch}
        />
      )}

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search bookings..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredBookings}
        progressPending={isLoading}
        pagination
        highlightOnHover
        responsive
        striped
        noDataComponent="No bookings found"
      />
    </div>
  );
};

export default BookingList;
