import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getActivity, updateActivity } from "../../services/activityService";
import { getActivityTypes } from "../../services/activityTypeService";
import type { ActivityType } from "../../services/activityTypeService";

export default function ActivityEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [stressLevel, setStressLevel] = useState(1);
  const [status, setStatus] = useState("DRAFT");
  const [typeId, setTypeId] = useState<number | undefined>(undefined);
  const [publicationDate, setPublicationDate] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState<string>();
  const [types, setTypes] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [activityRes, typesRes] = await Promise.all([
          getActivity(Number(id)),
          getActivityTypes(),
        ]);

        const data = activityRes.data;
        setName(data.name);
        setDescription(data.description);
        setDuration(data.duration || 0);
        setStressLevel(data.stressLevel || 1);
        setStatus(data.status || "DRAFT");
        setTypeId(data.typeId);
        setPublicationDate(data.publicationDate?.split("T")[0] || "");
        setTypes(typesRes.data);
        if (data.thumbnail) {
          setExistingThumbnailUrl(`${import.meta.env.VITE_API_URL}${data.thumbnail}`);
        }
      } catch (err) {
        console.error("Erreur lors du chargement de l'activité :", err);
        navigate("/activities");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !typeId || duration <= 0 || stressLevel <= 0) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("duration", String(duration));
    formData.append("stressLevel", String(stressLevel));
    formData.append("status", status);
    formData.append("typeId", String(typeId));
    formData.append("publicationDate", publicationDate);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      await updateActivity(Number(id), formData);
      navigate("/activities");
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
    }
  };

  if (loading) {
    return <div>Chargement de l'activité...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Modifier une activité</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nom</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-10 rounded bg-gray-100 px-3 mb-4 text-black"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Contenu</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-10 rounded bg-gray-100 px-3 py-2 mb-4 text-black"
            rows={6}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Durée (minutes)</label>
          <input
            type="number"
            min={1}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-10 rounded bg-gray-100 px-3 mb-4 text-black"
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
          <label className="block mb-1 font-medium">Statut</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full h-10 rounded bg-gray-100 px-3 mb-4 text-black"
            required
          >
            <option value="PUBLISHED">Publié</option>
            <option value="DRAFT">Brouillon</option>
            <option value="HIDDEN">Caché</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Type d'activité</label>
          <select
            value={typeId}
            onChange={(e) => setTypeId(Number(e.target.value))}
            className="w-full h-10 rounded bg-gray-100 px-3 mb-4 text-black"
            required
          >
            <option value="">Sélectionner...</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Date de publication</label>
          <input
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            className="w-full h-10 rounded bg-gray-100 px-3 mb-4 text-black"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Miniature</label>
          {existingThumbnailUrl && (
            <div className="mb-2">
              <img
                src={existingThumbnailUrl}
                alt="Miniature actuelle"
                className="w-48 h-auto rounded shadow"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 rounded bg-gray-100 text-black file:mr-2 file:py-1 file:px-3 file:border-0 file:rounded file:bg-green-600 file:text-white"
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
