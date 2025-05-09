import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, disableUser, restoreUser, deleteUser } from "../../services/userService";
import type { User } from "../../services/userService";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs :", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAction = async (user: User, action: "disable" | "restore" | "delete") => {
    if (action === "disable") await disableUser(user.id);
    if (action === "restore") await restoreUser(user.id);
    if (action === "delete") {
      if (!confirm("Supprimer définitivement cet utilisateur ?")) return;
      await deleteUser(user.id);
    }
    fetchUsers();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Liste des utilisateurs</h1>
        <Link
          to="/users/create"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Créer un utilisateur
        </Link>
      </div>

      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Rôle</th>
            <th className="border p-2">Statut</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.role.label}</td>
              <td className="border p-2">
                {user.isActive ? "Actif" : "Inactif"}
              </td>
              <td className="border p-2 space-x-2">
                <Link
                  to={`/users/edit/${user.id}`}
                  className="text-green-600 hover:underline"
                >
                  Modifier
                </Link>
                {user.isActive ? (
                  <button onClick={() => handleAction(user, "disable")} className="text-red-600 hover:underline">
                    Désactiver
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleAction(user, "restore")} className="text-green-600 hover:underline">
                      Restaurer
                    </button>
                    <button onClick={() => handleAction(user, "delete")} className="text-red-600 hover:underline">
                      Supprimer
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}