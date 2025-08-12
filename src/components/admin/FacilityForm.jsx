import React, { useEffect, useState } from "react";
import {
  useAddFacilityMutation,
  useCreateFacilityMutation,
  useUpdateFacilityMutation,
} from "../../redux/api/facilityApi";
import toast from "react-hot-toast";

const FacilityForm = ({ selected, onClose, refetch }) => {
  const [form, setForm] = useState({
    name: "",
    type: "common",
    price: "",
  });

  const [addFacility] = useCreateFacilityMutation();
  const [updateFacility] = useUpdateFacilityMutation();

  useEffect(() => {
    if (selected) {
      setForm(selected);
    }
  }, [selected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selected) {
        await updateFacility({ id: selected._id, ...form }).unwrap();
        toast.success("Facility updated");
      } else {
        await addFacility(form).unwrap();
        toast.success("Facility added");
      }
      onClose();
      refetch();
    } catch (err) {
      toast.error("Error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 mb-3">
      <h5>{selected ? "Edit" : "Add"} Facility</h5>
      <div className="row">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Facility Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-control"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="common">Common</option>
            <option value="optional">Optional</option>
          </select>
        </div>

        {form.type === "optional" && (
          <div className="col-md-4 mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
        )}
      </div>
      <button className="btn btn-success me-2">
        {selected ? "Update" : "Add"}
      </button>
      <button type="button" className="btn btn-secondary" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default FacilityForm;
