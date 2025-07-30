import React, { useEffect, useState } from "react";
import {
  useGetRolesQuery,
  useGetPermissionsQuery,
  useUpdateRolePermissionsMutation,
} from "../../redux/api/adminApi";
import toast from "react-hot-toast";

const EditRolePermissions = ({ role, onClose, onPermissionsUpdated }) => {
  const { data: permissionsData, isLoading } = useGetPermissionsQuery();
  const [updateRolePermissions] = useUpdateRolePermissionsMutation();

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (role?.permissions) {
      if (Array.isArray(role.permissions)) {
        setSelected(
          role.permissions.map((p) => (typeof p === "string" ? p : p._id))
        );
      } else if (role.permissions?._id) {
        setSelected([role.permissions._id]);
      } else {
        setSelected([]);
      }
    } else {
      setSelected([]);
    }
  }, [role]);

  const handleCheckboxChange = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    try {
      await updateRolePermissions({
        id: role._id,
        permissions: selected,
      }).unwrap();
      toast.success("Permissions updated");
      onPermissionsUpdated();
      onClose();
    } catch (error) {
      toast.error("Error updating permissions");
    }
  };

  return (
    <div className="card p-4 mt-3">
      <h5>Edit Permissions for Role: {role.name}</h5>
      {isLoading ? (
        <p>Loading permissions...</p>
      ) : (
        <ul className="list-group">
          {permissionsData.permissions?.map((perm) => (
            <li key={perm._id} className="list-group-item">
              <label>
                <input
                  type="checkbox"
                  checked={selected.includes(perm._id)}
                  onChange={() => handleCheckboxChange(perm._id)}
                />{" "}
                {perm.action}
              </label>
            </li>
          ))}
        </ul>
      )}
      <button className="btn btn-primary mt-3" onClick={handleSave}>
        Save Permissions
      </button>
      <button className="btn btn-secondary mt-2" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
};

const RoleList = () => {
  const { data: roles, isLoading, refetch: refetchRoles } = useGetRolesQuery();
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div className="container">
      <h4>Roles</h4>
      {isLoading ? (
        <p>Loading roles...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Role</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles?.map((role) => (
              <tr key={role._id}>
                <td>{role.name}</td>
                <td>
                  {Array.isArray(role.permissions)
                    ? role.permissions.map((p) => p.action).join(", ")
                    : role.permissions?.action || "No permissions"}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setSelectedRole(role)}
                  >
                    Edit Permissions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedRole && (
        <EditRolePermissions
          role={selectedRole}
          onClose={() => setSelectedRole(null)}
          onPermissionsUpdated={refetchRoles}
        />
      )}
    </div>
  );
};

export default RoleList;
