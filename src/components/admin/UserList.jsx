import React, { useState, useMemo } from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../redux/api/adminApi";
import toast from "react-hot-toast";
import DataTable from "react-data-table-component";
import AddUserForm from "./AddUserForm";

const UserList = () => {
  const { data, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle user deletion with confirmation
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete user");
    }
  };

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim() || !data?.users) return data?.users || [];
    const term = searchTerm.toLowerCase();
    return data.users.filter((user) => {
      return (
        (user.name && user.name.toLowerCase().includes(term)) ||
        (user.email && user.email.toLowerCase().includes(term)) ||
        (user.phone && user.phone.toLowerCase().includes(term)) ||
        (user.role?.name && user.role.name.toLowerCase().includes(term))
      );
    });
  }, [data, searchTerm]);

  if (error) {
    toast.error("Failed to load users");
    return null;
  }

  // DataTable columns
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role?.name || "N/A", // Show role name
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
                  setEditUser(row);
                  setShowAddForm(true);
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

        // <div className="btn-group">
        //   <button
        //     className="btn btn-sm btn-warning"
        //     onClick={() => {
        //       setEditUser(row);
        //       setShowAddForm(true);
        //     }}
        //   >
        //     Edit
        //   </button>
        //   <button
        //     className="btn btn-sm btn-danger ms-2"
        //     onClick={() => handleDelete(row._id)}
        //   >
        //     Delete
        //   </button>
        // </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>User Management</h3>{" "}
        <button
          className="btn btn-primary mb-3"
          onClick={() => {
            setEditUser(null);
            setShowAddForm(!showAddForm);
          }}
        >
          {showAddForm ? "Close Form" : "Add New User"}
        </button>
      </div>

      {showAddForm && (
        <AddUserForm
          onClose={() => setShowAddForm(false)}
          refetch={refetch}
          user={editUser}
        />
      )}

      {/* Search input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search users by name, email, phone, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        progressPending={isLoading}
        pagination
        highlightOnHover
        striped
        persistTableHead
        noDataComponent="No users found"
      />
    </div>
  );
};

export default UserList;
