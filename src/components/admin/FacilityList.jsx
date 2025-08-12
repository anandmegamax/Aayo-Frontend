import React, { useState } from "react";
import {
  useGetFacilitiesQuery,
  useDeleteFacilityMutation,
  useGetAllFacilitiesQuery,
} from "../../redux/api/facilityApi";
import FacilityForm from "./FacilityForm";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";

const FacilityList = () => {
  const { data: facilities, refetch } = useGetAllFacilitiesQuery();
  const [deleteFacility] = useDeleteFacilityMutation();
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this facility?")) {
      await deleteFacility(id);
      toast.success("Facility deleted");
      refetch();
    }
  };

  const columns = [
    { name: "Facility", selector: (row) => row.name, sortable: true },
    { name: "Type", selector: (row) => row.type, sortable: true },
    {
      name: "Price",
      selector: (row) => (row.type === "optional" ? `₹${row.price}` : "-"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="dropdown">
          <button
            className="btn btn-sm btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Actions
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setSelected(row);
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Manage Facilities</h4>
        <button
          className="btn btn-primary"
          onClick={() => {
            setSelected(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Hide Form" : "Add Facility"}
        </button>
      </div>

      {showForm && (
        <FacilityForm
          selected={selected}
          onClose={() => setShowForm(false)}
          refetch={refetch}
        />
      )}

      <DataTable
        columns={columns}
        data={facilities || []}
        pagination
        highlightOnHover
        noDataComponent="No facilities found"
        progressPending={!facilities}
      />
    </div>
  );
};

export default FacilityList;
