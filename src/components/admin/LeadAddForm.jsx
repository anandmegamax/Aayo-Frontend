// components/admin/LeadAddForm.jsx
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAddLeadMutation } from "../../redux/api/leadApi";
import { useGetAllUsersQuery } from "../../redux/api/userApi";

const LeadAddForm = ({ refetch, onClose }) => {
  const { data: users } = useGetAllUsersQuery();
  console.log("Users:", users);
  const [addLead, { isLoading }] = useAddLeadMutation();
  const [form, setForm] = useState({
    userId: "",
    email: "",
    phone: "",
    fromPlace: "",
    toPlace: "",
    travelDate: "",
    travelTime: "",
  });

  const handleUserChange = (e) => {
    const userId = e.target.value;
    const selectedUser = users?.users?.find((u) => u._id === userId);
    setForm((prev) => ({
      ...prev,
      userId,
      email: selectedUser?.email || "",
      phone: selectedUser?.phone || "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.userId) {
      toast.error("Please select a user");
      return;
    }
    try {
      await addLead(form).unwrap();
      toast.success("Lead added successfully");
      onClose();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add lead");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 mb-3">
      <h5>Add New Lead</h5>
      <div className="row">
        <div className="col-md-4 mb-2">
          <select
            className="form-control"
            value={form.userId}
            onChange={handleUserChange}
            required
          >
            <option value="">Select User</option>
            {users?.users?.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <input
            className="form-control"
            placeholder="Email"
            name="email"
            value={form.email}
            readOnly
          />
        </div>
        <div className="col-md-4 mb-2">
          <input
            className="form-control"
            placeholder="Phone"
            name="phone"
            value={form.phone}
            readOnly
          />
        </div>
        <div className="col-md-4 mb-2">
          <input
            className="form-control"
            placeholder="From Place"
            name="fromPlace"
            value={form.fromPlace}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4 mb-2">
          <input
            className="form-control"
            placeholder="To Place"
            name="toPlace"
            value={form.toPlace}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2 mb-2">
          <input
            className="form-control"
            type="date"
            name="travelDate"
            value={form.travelDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2 mb-2">
          <input
            className="form-control"
            type="time"
            name="travelTime"
            value={form.travelTime}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button className="btn btn-success me-2" disabled={isLoading}>
        Add Lead
      </button>
      <button className="btn btn-secondary" onClick={onClose} type="button">
        Cancel
      </button>
    </form>
  );
};

export default LeadAddForm;
