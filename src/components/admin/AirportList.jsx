import React, { useState } from "react";
import DataTable from "react-data-table-component";
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
  const [searchText, setSearchText] = useState("");

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteAirport(id);
      toast.success("Airport deleted");
      refetch();
    }
  };

  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Code",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Short Name",
      selector: (row) => row.shortName,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
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
                  setEditingAirport(row);
                  setShowForm(true);
                }}
              >
                Edit
              </button>
            </li>
            <li>
              <button
                className="dropdown-item text-danger"
                onClick={() => handleDelete(row._id)}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  const filteredData = data?.airports?.filter((airport) =>
    Object.values(airport)
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {/* <h4 className="mb-3">Airport Management</h4>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingAirport(null);
            setShowForm(true);
          }}
        >
          Add Airport
        </button> */}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Airport Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingAirport(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close Form" : "Add Airport"}
        </button>
      </div>

      {/* <input
          type="text"
          className="form-control w-25"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        /> */}

      {showForm && (
        <AirportForm
          editingAirport={editingAirport}
          setShowForm={setShowForm}
          refetch={refetch}
        />
      )}

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search Airports..."
          className="form-control"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredData || []}
        progressPending={isLoading}
        pagination
        highlightOnHover
        responsive
        noDataComponent="No airports found"
        persistTableHead
      />
    </div>
  );
};

export default AirportList;
