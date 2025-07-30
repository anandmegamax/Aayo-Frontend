import React, { useEffect, useState } from "react";
import {
  useCreateFlightTypeMutation,
  useUpdateFlightTypeMutation,
} from "../../redux/api/flightTypeApi";
import toast from "react-hot-toast";

const FlightTypeForm = ({ editingFlight, setShowForm, refetch }) => {
  const [form, setForm] = useState({
    name: "",
    capacity: "",
    description: "",
    maxSpeed: "",
    status: true,
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const [createFlightType] = useCreateFlightTypeMutation();
  const [updateFlightType] = useUpdateFlightTypeMutation();

  useEffect(() => {
    if (editingFlight) {
      setForm({
        name: editingFlight.name,
        capacity: editingFlight.capacity,
        description: editingFlight.description,
        maxSpeed: editingFlight.maxSpeed,
        status: editingFlight.status,
        image: null, // image file not needed on edit unless replaced
      });
      setPreviewImage(editingFlight.image?.url || null);
    }
  }, [editingFlight]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "file") {
      setForm({ ...form, image: e.target.files[0] });
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val !== null) formData.append(key, val);
    });

    // ✅ Debug log for FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      if (editingFlight) {
        await updateFlightType({
          id: editingFlight._id,
          formData,
        }).unwrap();
        toast.success("Flight type updated");
      } else {
        await createFlightType(formData).unwrap();
        toast.success("Flight type created");
      }

      setShowForm(false);
      refetch();
    } catch (err) {
      toast.error("Failed to save flight type");
    }
  };

  return (
    <form
      className="border p-4 mb-4"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <h5>{editingFlight ? "Edit" : "Add"} Flight Type</h5>
      <div className="row">
        <div className="col-md-4 mb-3">
          <input
            type="text"
            name="name"
            placeholder="Flight Name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2 mb-3">
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            className="form-control"
            value={form.capacity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3 mb-3">
          <input
            type="text"
            name="maxSpeed"
            placeholder="Max Speed"
            className="form-control"
            value={form.maxSpeed}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3 mb-3">
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="form-control"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            type="file"
            name="image"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {previewImage && (
          <div className="col-md-3 mb-3">
            <img
              src={previewImage}
              alt="Preview"
              width="100"
              className="rounded"
            />
          </div>
        )}

        <div className="col-md-3 mb-3 d-flex align-items-center">
          <label className="form-check-label me-2" htmlFor="status">
            Active:
          </label>
          <input
            type="checkbox"
            id="status"
            name="status"
            checked={form.status}
            onChange={handleChange}
          />
        </div>
      </div>
      <button className="btn btn-success">
        {editingFlight ? "Update" : "Save"}
      </button>{" "}
      <button
        className="btn btn-secondary ms-2"
        onClick={() => setShowForm(false)}
      >
        Cancel
      </button>
    </form>
  );
};

export default FlightTypeForm;
