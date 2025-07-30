import React, { useState } from "react";
import {
  useGetAirportsQuery,
  useDeleteAirportMutation,
} from "../../redux/api/airportApi";
import AirportForm from "./AirportForm";
import toast from "react-hot-toast";

const AirportList = () => {
  const { data, isLoading, refetch } = useGetAirportsQuery();
  const [deleteAirport] = useDeleteAirportMutation();
  const [editingAirport, setEditingAirport] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteAirport(id);
      toast.success("Airport deleted");
      refetch();
    }
  };

  return (
    <div className="container mt-4">
      <h4>Airport Management</h4>
      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          setEditingAirport(null);
          setShowForm(true);
        }}
      >
        Add Airport
      </button>

      {showForm && (
        <AirportForm
          editingAirport={editingAirport}
          setShowForm={setShowForm}
          refetch={refetch}
        />
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Code</th>
              <th>Short Name</th>
              <th>City</th>
              <th>Country</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.airports?.map((airport) => (
              <tr key={airport._id}>
                <td>{airport.name}</td>
                <td>{airport.code}</td>
                <td>{airport.shortName}</td>
                <td>{airport.city}</td>
                <td>{airport.country}</td>
                <td>{airport.status}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setEditingAirport(airport);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(airport._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AirportList;
