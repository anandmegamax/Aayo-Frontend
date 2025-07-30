import React from "react";

const SearchBar = ({ value, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="mb-3 d-flex gap-2">
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <button type="submit" className="btn btn-primary">
      Search
    </button>
  </form>
);

export default SearchBar;
