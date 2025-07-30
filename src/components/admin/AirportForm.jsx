import React, { useEffect, useState } from "react";
import {
  useCreateAirportMutation,
  useUpdateAirportMutation,
} from "../../redux/api/airportApi";
import toast from "react-hot-toast";

const AirportForm = ({ editingAirport, setShowForm, refetch }) => {
  const [form, setForm] = useState({
    name: "",
    code: "",
    shortName: "",
    city: "",
    country: "",
    coordinates: [], // [lng, lat]
    status: "active",
  });

  const [createAirport] = useCreateAirportMutation();
  const [updateAirport] = useUpdateAirportMutation();

  useEffect(() => {
    if (editingAirport) {
      setForm({
        name: editingAirport.name || "",
        code: editingAirport.code || "",
        shortName: editingAirport.shortName || "",
        city: editingAirport.city || "",
        country: editingAirport.country || "",
        coordinates: editingAirport.location?.coordinates || [],
        status: editingAirport.status || "active",
      });
    }
  }, [editingAirport]);

  const handlePlaceSelect = (e) => {
    const selectedPlace = e.target.value.split(",");
    const [lat, lng] = selectedPlace.map((v) => parseFloat(v.trim()));

    if (
      isNaN(lat) ||
      isNaN(lng) ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      toast.error(
        "Invalid coordinates. Format: Latitude between -90 to 90, Longitude between -180 to 180"
      );
      return;
    }

    setForm({ ...form, coordinates: [lng, lat] }); // MongoDB expects [lng, lat]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.coordinates?.length) {
      toast.error("Coordinates are required");
      return;
    }

    try {
      if (editingAirport) {
        await updateAirport({ id: editingAirport._id, body: form }).unwrap();
        toast.success("Airport updated successfully");
      } else {
        await createAirport(form).unwrap();
        toast.success("Airport created successfully");
      }

      setShowForm(false);
      refetch();
    } catch (err) {
      toast.error("Failed to save airport");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-3 mb-3 bg-light"
      encType="multipart/form-data"
    >
      <div className="row g-3">
        {["name", "code", "shortName", "city", "country"].map((field) => (
          <div className="col-md-4" key={field}>
            <input
              className="form-control"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={(e) =>
                setForm({ ...form, [field]: e.target.value.trimStart() })
              }
              required
            />
          </div>
        ))}

        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Latitude, Longitude"
            onBlur={handlePlaceSelect}
            defaultValue={
              form.coordinates.length
                ? [...form.coordinates].reverse().join(", ")
                : ""
            }
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="col-md-12 d-flex gap-2 mt-2">
          <button className="btn btn-success" type="submit">
            {editingAirport ? "Update" : "Add"} Airport
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default AirportForm;
