import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createActivity } from "../../services/activityService";
import { getActivityTypes } from "../../services/activityTypeService";
import type { ActivityType } from "../../services/activityTypeService";

export default function ActivityCreate() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState<number>(0);
  const [stressLevel, setStressLevel] = useState(1);
  const [status, setStatus] = useState("DRAFT");
  const [typeId, setTypeId] = useState<number | undefined>(undefined);
  const [publicationDate, setPublicationDate] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [types, setTypes] = useState<ActivityType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getActivityTypes().then((res) => setTypes(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!typeId || stressLevel <= 0 || duration <= 0) {
      alert("Tous les champs obligatoires doivent être remplis correctement.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("duration", String(duration));
    formData.append("stressLevel", String(stressLevel));
    formData.append("status", status);
    formData.append("typeId", String(typeId));
    formData.append("publicationDate", publicationDate);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      await createActivity(formData);
      navigate("/activities");
    } catch (error) {
      console.error("Erreur création activité :", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Créer une activité</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block mb-1">Nom</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-100"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Contenu</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-100"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Durée (en minutes)</label>
          <input
            type="number"
            min={1}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full px-3 py-2 rounded bg-gray-100"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Niveau de stress</label>
          <select
            value={stressLevel}
            onChange={(e) => setStressLevel(Number(e.target.value))}
            className="w-full px-3 py-2 rounded bg-gray-100"
            required
          >
            <option value="">Sélectionner un niveau</option>
            {[
              { value: 1, label: "Très faible 🧘" },
              { value: 2, label: "Faible 😌" },
              { value: 3, label: "Modéré 🙂" },
              { value: 4, label: "Élevé 😰" },
              { value: 5, label: "Très élevé 😱" },
            ].map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Statut</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-100"
            required
          >
            <option value="PUBLISHED">Publié</option>
            <option value="DRAFT">Brouillon</option>
            <option value="HIDDEN">Caché</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Type d'activité</label>
          <select
            value={typeId}
            onChange={(e) => setTypeId(Number(e.target.value))}
            className="w-full px-3 py-2 rounded bg-gray-100"
            required
          >
            <option value="">Sélectionner...</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Date de publication</label>
          <input
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-100"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Miniature</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 rounded bg-gray-100 text-black cursor-pointer file:cursor-pointer file:mr-2 file:py-1 file:px-3 file:border-0 file:rounded file:bg-green-600 file:text-white"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
