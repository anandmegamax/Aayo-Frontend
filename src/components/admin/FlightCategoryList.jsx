import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import {
  useGetFlightCategoriesQuery,
  useDeleteFlightCategoryMutation,
} from "../../redux/api/flightCategoryApi";
import FlightCategoryForm from "./FlightCategoryForm";
import toast from "react-hot-toast";

const FlightCategoryList = () => {
  const { data, isLoading, refetch } = useGetFlightCategoriesQuery();
  const [deleteCategory] = useDeleteFlightCategoryMutation();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchText, setSearchText] = useState("");

  const handleAdd = () => {
    setEditData(null);
    setIsFormOpen(true);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        toast.success("Flight Category deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || "Delete failed");
      }
    }
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    {
      name: "Image",
      cell: (row) =>
        row.image?.url ? (
          <img
            src={row.image.url}
            alt={row.name}
            width="60"
            height="40"
            style={{ objectFit: "cover" }}
          />
        ) : (
          "No Image"
        ),
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
              <button className="dropdown-item" onClick={() => handleEdit(row)}>
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

  // Search filter
  const filteredData = useMemo(() => {
    if (!data?.flightCategories) return [];
    return data.flightCategories.filter((category) =>
      category.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Flight Categories</h2>

        <button
          className="btn btn-primary"
          onClick={() => {
            setIsFormOpen(!isFormOpen);
            setEditData(null);
          }}
        >
          {isFormOpen ? "Hide Form" : "Add Flight Category"}
        </button>

        {/* <button onClick={handleAdd} className="btn btn-success">
          Add Category
        </button> */}
      </div>

      {isFormOpen && (
        <FlightCategoryForm
          editData={editData}
          closeForm={() => setIsFormOpen(false)}
          refetch={refetch}
        />
      )}

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        progressPending={isLoading}
        pagination
        highlightOnHover
        responsive
        striped
        persistTableHead
      />
    </div>
  );
};

export default FlightCategoryList;
