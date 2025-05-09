import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteMenu, getMenus } from "../../services/menuService";
import type { Menu } from "../../services/menuService";

export default function MenuList() {
  const [menus, setMenus] = useState<Menu[]>([]);

  const loadMenus = async () => {
    const response = await getMenus();
    setMenus(response.data);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Supprimer ce menu ?")) {
      await deleteMenu(id);
      loadMenus();
    }
  };

  useEffect(() => {
    loadMenus();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-6">Menus</h1>
        <Link
          to="/menus/create"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          + Créer un menu
        </Link>
      </div>
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.id}>
              <td className="border p-2">{menu.id}</td>
              <td className="border p-2">{menu.label}</td>
              <td className="border p-2">
                <Link
                  to={`/menus/edit/${menu.id}`}
                  className="text-green-600 hover:underline mr-4"
                >
                  Modifier
                </Link>
                <button
                  onClick={() => handleDelete(menu.id)}
                  className="text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
