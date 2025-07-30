import React, { useState, useMemo } from "react";
import { useGetUsersQuery } from "../../redux/api/adminApi";
import toast from "react-hot-toast";
import DataTable from "react-data-table-component";
import AddUserForm from "./AddUserForm";

const UserList = () => {
  const { data, isLoading, error, refetch } = useGetUsersQuery();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users based on search term.
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim() || !data?.users) return data?.users || [];
    const term = searchTerm.toLowerCase();
    return data.users.filter((user) => {
      return (
        (user.name && user.name.toLowerCase().includes(term)) ||
        (user.email && user.email.toLowerCase().includes(term)) ||
        (user.phone && user.phone.toLowerCase().includes(term)) ||
        (user.role && user.role.toLowerCase().includes(term))
      );
    });
  }, [data, searchTerm]);

  if (error) {
    toast.error("Failed to load users");
    return null;
  }

  // Define the table columns for DataTable.
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
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="btn btn-sm btn-warning"
          onClick={() => {
            setEditUser(row);
            setShowAddForm(true);
          }}
        >
          Edit
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="container mt-4">
      <h3>User Role Management</h3>

      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          setEditUser(null);
          setShowAddForm(!showAddForm);
        }}
      >
        {showAddForm ? "Close Form" : "Add New User"}
      </button>

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
          placeholder="Search users by name, email, or role..."
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
