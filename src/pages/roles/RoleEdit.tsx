import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoleById, updateRole } from "../../services/roleService";
import type { Role } from "../../services/roleService";

export default function RoleEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [label, setLabel] = useState("");
  const [level, setLevel] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getRoleById(Number(id))
      .then((res) => {
        const data: Role = res.data;
        setLabel(data.label);
        setLevel(data.level);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement du rôle:", err);
        navigate("/roles");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await updateRole(Number(id), { label, level });
      navigate("/roles");
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Modifier un rôle</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block mb-1">Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full p-2 rounded bg-gray-100"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Niveau</label>
          <input
            type="number"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-100"
            required
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}
