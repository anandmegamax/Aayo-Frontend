const SortableHeader = ({ column, label, currentSort, onSortChange }) => {
  let direction = "";
  if (currentSort === column) direction = "▲";
  else if (currentSort === `-${column}`) direction = "▼";

  return (
    <th onClick={() => onSortChange(column)} style={{ cursor: "pointer" }}>
      {label} {direction}
    </th>
  );
};

export default SortableHeader;
