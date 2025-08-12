import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  useRegisterMutation,
  useUpdateUserMutation,
} from "../../redux/api/authApi";
import {
  useGetRolesQuery,
  useUpdateUserDetailsMutation,
} from "../../redux/api/adminApi";

const AddUserForm = ({ onClose, refetch, user }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    roleName: "",
  });

  const { data: roleData } = useGetRolesQuery();
  const [registerUser, { isLoading: adding }] = useRegisterMutation();
  const [updateUser, { isLoading: updating }] = useUpdateUserDetailsMutation();

  // Prefill form when editing
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        roleName:
          typeof user.role === "object" ? user.role._id : user.role || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user?._id) {
        // Edit Mode
        console.log("AddUserForm", form);

        //await updateUser({ id: user._id, ...form }).unwrap();
        await updateUser({ id: user._id, data: form }).unwrap();
        toast.success("User updated successfully");
      } else {
        // Add Mode
        await registerUser(form).unwrap();
        toast.success("User added successfully");
      }

      onClose();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to submit form");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 mb-3">
      <h5>{user ? "Edit User" : "Add New User"}</h5>

      <div className="row">
        <div className="col-md-3 mb-2">
          <input
            className="form-control"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3 mb-2">
          <input
            className="form-control"
            placeholder="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={!!user} // Disable email editing when in edit mode
          />
        </div>

        <div className="col-md-3 mb-2">
          <input
            className="form-control"
            placeholder="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3 mb-2">
          <input
            className="form-control"
            placeholder="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required={!user} // Required only when adding a user
          />
        </div>

        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            name="roleName"
            value={form.roleName}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            {roleData?.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="btn btn-success me-2"
        disabled={adding || updating}
        type="submit"
      >
        {user
          ? updating
            ? "Updating..."
            : "Update User"
          : adding
          ? "Adding..."
          : "Add User"}
      </button>

      <button className="btn btn-secondary" onClick={onClose} type="button">
        Cancel
      </button>
    </form>
  );
};

export default AddUserForm;
