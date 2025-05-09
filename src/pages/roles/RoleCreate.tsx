import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRole } from "../../services/roleService";

export default function RoleCreate() {
  const [label, setLabel] = useState("");
  const [level, setLevel] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRole({ label, level });
      navigate("/roles");
    } catch (error) {
      console.error("Erreur lors de la création du rôle:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Créer un rôle</h1>
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
          Enregistrer
        </button>
      </form>
    </div>
  );
}