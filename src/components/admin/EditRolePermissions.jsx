import React, { useState, useEffect } from "react";
import {
  useGetPermissionsQuery,
  useUpdateRolePermissionsMutation,
} from "../../redux/api/adminApi";

const EditRolePermissions = ({ role }) => {
  const { data: permsData, isLoading } = useGetPermissionsQuery();
  const [updateRolePermissions] = useUpdateRolePermissionsMutation();

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    console.log("RoleSelected:", role);

    if (role?.permissions) {
      setSelected(role.permissions.map((p) => p._id));
    }
  }, [role]);

  const handleCheckboxChange = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    try {
      await updateRolePermissions({
        id: role._id,
        permissions: selected,
      }).unwrap();
      toast.success("Permissions updated");
      // Trigger parent refetch
      if (typeof refetchRoles === "function") {
        refetchRoles();
      }
      onClose();
    } catch (err) {
      toast.error("Failed to update permissions");
    }
  };

  return (
    <div>
      <h5>Edit Permissions for: {role.name}</h5>
      {isLoading ? (
        <p>Loading permissions...</p>
      ) : (
        <ul className="list-group">
          {permsData?.map((perm) => (
            <li key={perm._id} className="list-group-item">
              <input
                type="checkbox"
                checked={selected.includes(perm._id)}
                onChange={() => handleCheckboxChange(perm._id)}
              />{" "}
              {perm.name}
            </li>
          ))}
        </ul>
      )}

      <button className="btn btn-primary mt-3" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default EditRolePermissions;
