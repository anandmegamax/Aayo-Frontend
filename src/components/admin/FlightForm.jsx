import React, { useEffect, useState } from "react";
import {
  useCreateFlightMutation,
  useUpdateFlightMutation,
} from "../../redux/api/flightApi";
import { useGetFlightTypesQuery } from "../../redux/api/flightTypeApi";
import toast from "react-hot-toast";

const FlightForm = ({ editingFlight, onSuccess }) => {
  const [form, setForm] = useState({
    flightType: "",
    from: "",
    to: "",
    date: "",
    time: "",
  });

  const { data: flightTypes } = useGetFlightTypesQuery();
  const [createFlight] = useCreateFlightMutation();
  const [updateFlight] = useUpdateFlightMutation();
  console.log("flights: ", flightTypes);
  useEffect(() => {
    if (editingFlight) {
      setForm({
        flightType: editingFlight.flightType._id,
        from: editingFlight.from,
        to: editingFlight.to,
        date: editingFlight.date.split("T")[0],
        time: editingFlight.time,
      });
    }
  }, [editingFlight]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFlight) {
        await updateFlight({ id: editingFlight._id, data: form }).unwrap();
        toast.success("Flight updated");
      } else {
        await createFlight(form).unwrap();
        toast.success("Flight created");
      }
      onSuccess();
    } catch (err) {
      toast.error("Error saving flight");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 rounded mt-4">
      <h5>{editingFlight ? "Edit" : "Add"} Flight</h5>
      <select
        className="form-select mb-2"
        name="flightType"
        value={form.flightType}
        onChange={handleChange}
        required
      >
        <option value="">Select Flight Type</option>
        {flightTypes?.flightTypes?.map((f) => (
          <option key={f._id} value={f._id}>
            {f.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="from"
        placeholder="From"
        className="form-control mb-2"
        value={form.from}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="to"
        placeholder="To"
        className="form-control mb-2"
        value={form.to}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        className="form-control mb-2"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="time"
        className="form-control mb-2"
        value={form.time}
        onChange={handleChange}
        required
      />
      <button className="btn btn-primary" type="submit">
        {editingFlight ? "Update" : "Add"} Flight
      </button>
    </form>
  );
};

export default FlightForm;
