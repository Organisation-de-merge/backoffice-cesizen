import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getActivityTypes, deleteActivityType } from "../../services/activityTypeService";
import type { ActivityType } from "../../services/activityTypeService";

export default function ActivityTypeList() {
  const [types, setTypes] = useState<ActivityType[]>([]);
  const navigate = useNavigate();

  const loadTypes = async () => {
    const response = await getActivityTypes();
    setTypes(response.data);
  };

  useEffect(() => {
    loadTypes();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Supprimer ce type ?")) {
      await deleteActivityType(id);
      loadTypes();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Types d'activité</h1>
        <Link
          to="/activity-types/create"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Créer un type
        </Link>
      </div>

      <table className="w-full border-collapse text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {types.map((type) => (
            <tr key={type.id}>
              <td className="border p-2">{type.id}</td>
              <td className="border p-2">{type.label}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => navigate(`/activity-types/edit/${type.id}`)}
                  className="text-green-600 underline"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(type.id)}
                  className="text-red-600 underline"
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
