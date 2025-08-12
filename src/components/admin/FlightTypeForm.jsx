import React, { useEffect, useState } from "react";
import {
  useCreateFlightTypeMutation,
  useUpdateFlightTypeMutation,
} from "../../redux/api/flightTypeApi";
import toast from "react-hot-toast";
import MyEditorComponent from "../MyEditorComponent";
import { useGetFlightCategoriesQuery } from "../../redux/api/flightCategoryApi"; // <-- Import API hook for categories

const FlightTypeForm = ({ editingFlight, setShowForm, refetch }) => {
  const [form, setForm] = useState({
    name: "",
    capacity: "",
    description: "",
    maxSpeed: "",
    status: true,
    baggage: "",
    baseLocation: "",
    pilots: "",
    flightAttendant: false,
    flightCategory: "", // <-- new field
  });

  const [existingImages, setExistingImages] = useState([]); // existing image URLs from DB
  const [newImages, setNewImages] = useState([]); // newly selected files
  const [previewImages, setPreviewImages] = useState([]); // mix of both
  const [removedImageIds, setRemovedImageIds] = useState([]); // <-- for public_ids

  const [createFlightType] = useCreateFlightTypeMutation();
  const [updateFlightType] = useUpdateFlightTypeMutation();
  const { data: categoryData, isLoading: categoriesLoading } =
    useGetFlightCategoriesQuery();

  useEffect(() => {
    if (editingFlight) {
      setForm({
        name: editingFlight.name,
        capacity: editingFlight.capacity,
        description: editingFlight.description,
        maxSpeed: editingFlight.maxSpeed,
        status: editingFlight.status,
        baggage: editingFlight.baggage || "",
        baseLocation: editingFlight.baseLocation || "",
        pilots: editingFlight.pilots || "",
        flightAttendant: editingFlight.flightAttendant || false,
        flightCategory: editingFlight.flightCategory?._id || "", // pre-fill if editing
      });
      setExistingImages(editingFlight.images || []); // image: { url, public_id }
    }
  }, [editingFlight]);

  useEffect(() => {
    const previews = [
      ...existingImages.map((img) => ({ type: "existing", src: img.url })),
      ...newImages.map((item) => ({ type: "new", src: item.preview })),
    ];
    setPreviewImages(previews);
  }, [existingImages, newImages]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const selectedFiles = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setNewImages([...newImages, ...selectedFiles]);
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const removeImage = (index) => {
    const imgToRemove = previewImages[index];

    if (imgToRemove.type === "existing") {
      const removedImage = existingImages.find(
        (img) => img.url === imgToRemove.src
      );
      if (removedImage) {
        setRemovedImageIds([...removedImageIds, removedImage.public_id]);
        setExistingImages(
          existingImages.filter((img) => img.url !== imgToRemove.src)
        );
      }
    } else {
      setNewImages(newImages.filter((img) => img.preview !== imgToRemove.src));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("capacity", form.capacity);
    formData.append("description", form.description);
    formData.append("maxSpeed", form.maxSpeed);
    formData.append("status", form.status);
    formData.append("baggage", form.baggage);
    formData.append("baseLocation", form.baseLocation);
    formData.append("pilots", form.pilots);
    formData.append("flightAttendant", form.flightAttendant);
    formData.append("flightCategory", form.flightCategory); // append category

    // Only needed if backend still checks for retained images
    existingImages.forEach((img) => {
      formData.append("existingImages[]", img.url);
    });

    // Removed images
    removedImageIds.forEach((id) => {
      formData.append("removedImages[]", id); // must match backend name
    });

    // Newly added images
    newImages.forEach((imgObj) => {
      formData.append("images", imgObj.file);
    });

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
    <div className="card p-3 mb-4">
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
          <div className="col-md-4 mb-4">
            <select
              name="flightCategory"
              className="form-control"
              value={form.flightCategory}
              onChange={handleChange}
              required
            >
              <option value="">Select Flight Category</option>
              {!categoriesLoading &&
                categoryData?.flightCategories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-4 mb-4">
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
          <div className="col-md-4 mb-4">
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
          <div className="col-md-4 mb-4">
            <input
              type="text"
              name="baggage"
              placeholder="Baggage"
              className="form-control"
              value={form.baggage}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-4">
            <input
              type="text"
              name="baseLocation"
              placeholder="Base Location"
              className="form-control"
              value={form.baseLocation}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-4">
            <input
              type="text"
              name="pilots"
              placeholder="Pilots"
              className="form-control"
              value={form.pilots}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-4 d-flex align-items-center">
            <label className="form-check-label me-2">Flight Attendant:</label>
            <input
              type="checkbox"
              name="flightAttendant"
              checked={form.flightAttendant}
              onChange={handleChange}
            />
          </div>
          {/* <div className="col-md-3 mb-3">
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="form-control"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div> */}

          <MyEditorComponent
            value={form.description}
            onChange={(value) =>
              setForm((prev) => ({ ...prev, description: value }))
            }
          />

          <div className="col-md-6 mb-3">
            <input
              type="file"
              name="images"
              className="form-control"
              accept="image/*"
              onChange={handleChange}
              multiple
            />
          </div>

          {previewImages.length > 0 &&
            previewImages.map((img, idx) => (
              <div className="col-md-2 mb-3 position-relative" key={idx}>
                <img
                  src={img.src}
                  alt={`Preview ${idx}`}
                  width="100"
                  className="rounded"
                />
                <button
                  type="button"
                  className="btn btn-sm btn-danger position-absolute top-0 end-0 translate-middle"
                  style={{ borderRadius: "50%" }}
                  onClick={() => removeImage(idx)}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
            ))}

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
          type="button"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default FlightTypeForm;
