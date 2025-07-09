import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getActivities, deleteActivity } from "../../services/activityService";
import type { ActivityInterface } from "../../services/activityService";

export default function ActivityList() {
  const [activities, setActivities] = useState<ActivityInterface[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(15);
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState("PUBLISHED");
  const [loading, setLoading] = useState(false);

  const loadActivities = async () => {
    setLoading(true);
    try {
      const response = await getActivities({ page, limit, query, status });
      const { items, pagination } = response.data;
      setActivities(items);
      setTotalPages(pagination.totalPages || 1);
    } catch (error) {
      console.error("Erreur lors du chargement des activités :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, [page, query, limit, status]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setQuery(searchInput);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Supprimer cette activité ?")) {
      await deleteActivity(id);
      loadActivities();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-6">Liste des activités</h1>
        <Link
          to="/activities/create"
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded cursor-pointer"
        >
          + Créer une activité
        </Link>
      </div>

      <form
        onSubmit={handleSearch}
        className="flex items-center justify-between gap-4 mb-4"
      >
        <div className="flex items-center gap-4 w-full">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Rechercher une activité..."
            className="border border-gray-300 p-2 rounded w-1/2"
          />

          <select
            value={status}
            onChange={handleStatusChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="PUBLISHED">Publié</option>
            <option value="DRAFT">Brouillon</option>
            <option value="HIDDEN">Caché</option>
          </select>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Rechercher
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="text-sm whitespace-nowrap">
            Lignes par page :
          </label>
          <select
            id="limit"
            value={limit}
            onChange={handleLimitChange}
            className="border border-gray-300 p-2 rounded"
          >
            {[10, 15, 20, 50].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-6">Chargement...</div>
      ) : (
        <>
          <table className="w-full text-left border-collapse table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Nom</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <tr key={`${activity.id}-${activity.name}`}>
                    <td className="border p-2">{activity.id}</td>
                    <td className="border p-2">{activity.name}</td>
                    <td className="border p-2">
                      {activity.publicationDate
                        ? new Date(activity.publicationDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="border p-2 gap-2">
                      <Link
                        to={`/activities/edit/${activity.id}`}
                        className="text-green-600 hover:underline"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => handleDelete(activity.id)}
                        className="text-red-600 hover:underline ml-2"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    Aucune activité trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Précédent
            </button>
            <div>
              Page {page} sur {totalPages}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
}
