import React, { useState, useEffect } from "react";
import {
  useCreateCategoryMutation,
  useCreateFlightCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateFlightCategoryMutation,
} from "../../redux/api/flightCategoryApi";
import toast from "react-hot-toast";

const FlightCategoryForm = ({ editData, closeForm, refetch }) => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const [createCategory] = useCreateFlightCategoryMutation();
  const [updateCategory] = useUpdateFlightCategoryMutation();

  useEffect(() => {
    if (editData) {
      setFormState({
        name: editData.name || "",
        description: editData.description || "",
        image: null, // file not prefilled
      });
      setPreview(editData.image.url || null);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormState({ ...formState, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("description", formState.description);
      if (formState.image) {
        formData.append("image", formState.image);
      }

      if (editData) {
        await updateCategory({ id: editData._id, formData }).unwrap();
        toast.success("Flight Category updated successfully");
      } else {
        await createCategory(formData).unwrap();
        toast.success("Flight Category created successfully");
      }

      refetch();
      closeForm();
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="card p-3 mb-4">
      <h5>{editData ? "Edit Category" : "Add Category"}</h5>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            value={formState.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="form-control"
            accept="image/*"
          />
        </div>

        {preview && (
          <div className="mb-3">
            <img
              src={preview}
              alt="Preview"
              style={{ width: "100px", height: "auto", borderRadius: "5px" }}
            />
          </div>
        )}

        <div className="d-flex">
          <button type="submit" className="btn btn-success me-2">
            {editData ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={closeForm}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlightCategoryForm;
