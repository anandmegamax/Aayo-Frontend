import React, { useState, useEffect } from "react";
import {
  useGetFlightsQuery,
  useDeleteFlightMutation,
  useToggleFlightStatusMutation,
} from "../../redux/api/flightApi";
import FlightForm from "./FlightForm";
import toast from "react-hot-toast";
import DataTable from "react-data-table-component";

const FlightList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFlights, setFilteredFlights] = useState([]);

  const { data, isLoading, refetch } = useGetFlightsQuery();
  const [deleteFlight] = useDeleteFlightMutation();
  const [toggleStatus] = useToggleFlightStatusMutation();
  const [editingFlight, setEditingFlight] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (data?.flights) {
      const filtered = data.flights.filter((flight) => {
        const from = flight.from?.toLowerCase() || "";
        const to = flight.to?.toLowerCase() || "";
        const type = flight.flightType?.name?.toLowerCase() || "";
        const status = flight.status?.toLowerCase() || "";
        const search = searchTerm.toLowerCase();
        return (
          from.includes(search) ||
          to.includes(search) ||
          type.includes(search) ||
          status.includes(search)
        );
      });
      setFilteredFlights(filtered);
    }
  }, [data, searchTerm]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteFlight(id).unwrap();
        toast.success("Flight deleted successfully");
        refetch();
      } catch (err) {
        toast.error("Failed to delete flight");
      }
    }
  };

  const handleToggle = async (id) => {
    await toggleStatus(id);
    refetch();
  };

  const columns = [
    {
      name: "Flight",
      selector: (row) => row.flightType.name,
      sortable: true,
    },
    {
      name: "From – To",
      selector: (row) => `${row.from} – ${row.to}`,
    },
    {
      name: "Date",
      selector: (row) => row.date.split("T")[0],
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={`badge ${
            row.status === "active" ? "bg-success" : "bg-secondary"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
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
                  setEditingFlight(row);
                  setShowForm(true);
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
                onClick={() => handleToggle(row._id)}
              >
                Toggle Status
              </button>
            </li>
          </ul>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Flight List</h4>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingFlight(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close Form" : "Add New Flight"}
        </button>
      </div>

      {showForm && (
        <FlightForm
          editingFlight={editingFlight}
          onSuccess={() => {
            setEditingFlight(null);
            setShowForm(false);
            refetch();
          }}
        />
      )}

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by flight type, from or to..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredFlights}
        progressPending={isLoading}
        pagination
        highlightOnHover
        responsive
        striped
        noDataComponent="No flights found"
      />
    </div>
  );
};

export default FlightList;
