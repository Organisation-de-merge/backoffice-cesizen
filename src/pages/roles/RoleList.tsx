import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRolesByStatus, disableRole, restoreRole } from "../../services/roleService";
import type { Role } from "../../services/roleService";

export default function RoleList() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [statusFilter, setStatusFilter] = useState(true);

  const loadRoles = async () => {
    try {
      const res = await getRolesByStatus(statusFilter);
      setRoles(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des rôles:", error);
    }
  };

  useEffect(() => {
    loadRoles();
  }, [statusFilter]);

  const handleToggleStatus = async (id: number) => {
    if (statusFilter) {
      await disableRole(id);
    } else {
      await restoreRole(id);
    }
    loadRoles();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-6">Liste des rôles</h1>
        <Link
          to="/roles/create"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          + Créer un rôle
        </Link>
      </div>

      <div className="mb-4">
        <label className="mr-2">Filtrer par statut:</label>
        <select
          value={statusFilter ? "active" : "inactive"}
          onChange={(e) => setStatusFilter(e.target.value === "active")}
          className="border p-2 rounded"
        >
          <option value="active">Actifs</option>
          <option value="inactive">Inactifs</option>
        </select>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Label</th>
            <th className="border p-2">Niveau</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="border p-2">{role.id}</td>
              <td className="border p-2">{role.label}</td>
              <td className="border p-2">{role.level}</td>
              <td className="border p-2 space-x-2">
                <Link to={`/roles/edit/${role.id}`} className="text-green-600 hover:underline">
                  Modifier
                </Link>
                <button
                  onClick={() => handleToggleStatus(role.id)}
                  className={`${
                    statusFilter ? "text-red-600" : "text-green-600"
                  } hover:underline`}
                >
                  {statusFilter ? "Désactiver" : "Restaurer"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}