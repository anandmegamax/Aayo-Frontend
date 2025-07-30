import React, { useState } from "react";
import {
  useGetMenusQuery,
  useCreateMenuMutation,
  useGetPermissionsQuery,
  useCreatePermissionMutation,
  useGetRolesQuery,
  useCreateRoleMutation,
} from "../../redux/api/adminApi";
import toast from "react-hot-toast";

export default function RolePermissionManager() {
  const { data: menus } = useGetMenusQuery();
  const [createMenu] = useCreateMenuMutation();
  const { data: permsData, isLoading } = useGetPermissionsQuery();
  const perms = permsData?.permissions || permsData || [];
  const [createPerm] = useCreatePermissionMutation();
  const { data: roles } = useGetRolesQuery();
  const [createRole] = useCreateRoleMutation();

  const [menuName, setMenuName] = useState("");
  const [newMenuSlug, setMenuSlug] = useState("");
  const [permMenuId, setPermMenuId] = useState("");
  const [permAction, setPermAction] = useState("");
  const [roleName, setRoleName] = useState("");
  const [rolePermIds, setRolePermIds] = useState([]);

  const toggleRolePerm = (id) =>
    setRolePermIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <div className="container py-4">
      <h4>Create Menu</h4>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await createMenu({ name: menuName, slug: newMenuSlug }).unwrap();
          setMenuName("");
          setMenuSlug("");
          toast.success("Menu created");
        }}
      >
        <input
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          placeholder="Menu Name"
          className="form-control mb-2"
        />
        <input
          value={newMenuSlug}
          onChange={(e) => setMenuSlug(e.target.value)}
          placeholder="Slug"
          className="form-control mb-2"
        />
        <button className="btn btn-primary">Create Menu</button>
      </form>

      <h4 className="mt-4">Create Permission</h4>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await createPerm({
            menuId: permMenuId,
            action: permAction,
            name: `${permMenuId}_${permAction}`,
          }).unwrap();
          setPermAction("");
          toast.success("Permission created");
        }}
      >
        <select
          className="form-select mb-2"
          value={permMenuId}
          onChange={(e) => setPermMenuId(e.target.value)}
        >
          <option value="">Select Menu</option>
          {menus?.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name}
            </option>
          ))}
        </select>
        <input
          value={permAction}
          onChange={(e) => setPermAction(e.target.value)}
          placeholder="Action e.g. view"
          className="form-control mb-2"
        />
        <button className="btn btn-primary">Create Permission</button>
      </form>

      <h4 className="mt-4">Create Role</h4>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await createRole({
            name: roleName,
            permissions: rolePermIds,
          }).unwrap();
          setRoleName("");
          setRolePermIds([]);
          toast.success("Role created");
        }}
      >
        <input
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          placeholder="Role Name"
          className="form-control mb-2"
        />

        {/* <div className="mb-2">
          {perms?.map((p) => (
            <div key={p._id} className="form-check">
              <input
                type="checkbox"
                checked={rolePermIds.includes(p._id)}
                onChange={() => toggleRolePerm(p._id)}
                id={p._id}
                className="form-check-input"
              />
              <label className="form-check-label">
                {p.menu.name} - {p.action}
              </label>
            </div>
          ))}
        </div> */}
        <button className="btn btn-primary">Create Role</button>
      </form>

      <h4 className="mt-4">Existing Roles</h4>
      <ul className="list-group">
        {roles?.map((r) => (
          <li key={r._id} className="list-group-item">
            <strong>{r.name}</strong> –{" "}
            {r.permissions?.length
              ? r.permissions.map((p) => p.action).join(", ")
              : "No permissions assigned"}
          </li>
        ))}
      </ul>
    </div>
  );
}
