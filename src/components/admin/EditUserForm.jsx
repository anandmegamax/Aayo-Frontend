import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useUpdateUserDetailsMutation,
  useGetRolesQuery,
} from "../../redux/api/adminApi";

const EditUserForm = ({ user, onClose, refetch, onUserUpdate }) => {
  const [updateUser, { isLoading }] = useUpdateUserDetailsMutation();
  const { data: roleData } = useGetRolesQuery();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roleId: "",
    password: "",
  });

  useEffect(() => {
    if (user && roleData?.length) {
      const roleId =
        typeof user.role === "string"
          ? user.role
          : roleData.find((r) => r.name === user.role?.name)?._id;

      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        roleId: roleId || "",
      });
    }
  }, [user, roleData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedRole = roleData?.find((r) => r._id === formData.roleId);
    if (!selectedRole) {
      toast.error("Please select a valid role.");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: user.phone, // Assuming phone is not editable
      role: selectedRole.name,
    };

    if (formData.password.trim()) {
      payload.password = formData.password;
    }

    try {
      await updateUser({ id: user._id, data: payload }).unwrap();
      toast.success("User updated successfully");
      onClose();
      refetch?.();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <div className="row g-3">
        <div className="col-md-3">
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Change Password (optional)"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <select
            name="roleId"
            className="form-select"
            value={formData.roleId}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            {roleData?.map((role) => (
              <option key={role._id} value={role._id}>
                {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 d-flex justify-content-end gap-2">
          <button
            className="btn btn-success"
            type="submit"
            disabled={isLoading}
          >
            Save
          </button>
          <button className="btn btn-secondary" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditUserForm;
