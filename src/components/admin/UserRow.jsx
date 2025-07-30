import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useGetRolesQuery,
  useUpdateUserRoleMutation,
} from "../../redux/api/adminApi";
import EditUserForm from "./EditUserForm";
const UserRow = ({ user, refetch }) => {
  const [role, setRole] = useState("");
  const [updateUserRole, { isLoading }] = useUpdateUserRoleMutation();
  const { data: roleData, isLoading: rolesLoading } = useGetRolesQuery();
  const [showEditForm, setShowEditForm] = useState(false);

  // Debug output
  // useEffect(() => {
  //   console.log(user);
  //   console.log("user.role:", user.role);
  //   console.log(
  //     "Fetched roles:",
  //     roleData?.map((r) => r.name)
  //   );
  // }, [roleData, user]);

  // Set user's current role if not already set
  useEffect(() => {
    if (roleData?.length && user?.role && !role) {
      setRole(user.role);
    }
  }, [roleData, user, role]);

  const handleChange = async () => {
    // Find role name from selectedRoleId
    const selectedRole = roleData?.find((r) => r._id === role);
    if (!selectedRole) return toast.error("Invalid role selected");

    try {
      await updateUserRole({ id: user._id, role: selectedRole.name }).unwrap();
      toast.success("Role updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Error updating role");
    }
  };

  return (
    <>
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          {roleData?.find((r) => r._id === user.role)?.name || "Unknown Role"}
        </td>
        <td>
          {rolesLoading ? (
            <span>Loading roles...</span>
          ) : (
            <>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={isLoading}
              >
                {roleData?.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.name.charAt(0).toUpperCase() + r.name.slice(1)}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-sm btn-primary mt-1"
                onClick={handleChange}
                disabled={isLoading || role === user.role}
              >
                Update
              </button>
              <button
                className="btn btn-sm btn-warning mt-1 ms-2"
                onClick={() => setShowEditForm(true)}
              >
                Edit
              </button>
            </>
          )}
        </td>
      </tr>
      {showEditForm && (
        <tr>
          <td colSpan="4">
            <EditUserForm
              user={user}
              onClose={() => setShowEditForm(false)}
              refetch={refetch}
              onUserUpdate={(updatedUser) => {
                setRole(updatedUser.role); // Update local state after edit
              }}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default UserRow;
