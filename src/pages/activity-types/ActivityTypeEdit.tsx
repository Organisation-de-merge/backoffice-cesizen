import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getActivityType, updateActivityType } from "../../services/activityTypeService";

export default function ActivityTypeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fetchType = async () => {
      if (!id) return;
      const response = await getActivityType(Number(id));
      setLabel(response.data.label);
    };
    fetchType();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    await updateActivityType(Number(id), { label });
    navigate("/activity-types");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Modifier un type d’activité</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nom du type</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full h-10 rounded bg-gray-100 px-3 text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}
