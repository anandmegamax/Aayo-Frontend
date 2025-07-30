import React, { useState } from "react";
import {
  useGetFlightTypesQuery,
  useDeleteFlightTypeMutation,
} from "../../redux/api/flightTypeApi";
import FlightTypeForm from "./FlightTypeForm";
import toast from "react-hot-toast";

const FlightTypeList = () => {
  const { data: flightTypes, isLoading, refetch } = useGetFlightTypesQuery();
  const [deleteFlightType] = useDeleteFlightTypeMutation();
  const [editingFlight, setEditingFlight] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this flight type?")) {
      try {
        await deleteFlightType(id).unwrap();
        toast.success("Flight type deleted");
        refetch();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  const handleEdit = (flight) => {
    setEditingFlight(flight);
    setShowForm(true);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Flight Type List</h4>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(true);
            setEditingFlight(null);
          }}
        >
          Add Flight Type
        </button>
      </div>

      {showForm && (
        <FlightTypeForm
          editingFlight={editingFlight}
          setShowForm={setShowForm}
          refetch={refetch}
        />
      )}

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Capacity</th>
            <th>Max Speed</th>
            <th>Description</th>
            <th>Image</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            flightTypes?.flightTypes?.map((flight) => (
              <tr key={flight._id}>
                <td>{flight.name}</td>
                <td>{flight.capacity}</td>
                <td>{flight.maxSpeed}</td>
                <td>{flight.description}</td>
                <td>
                  <img src={flight.image?.url} alt={flight.name} width="80" />
                </td>
                <td>{flight.status ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => handleEdit(flight)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(flight._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTypeList;
