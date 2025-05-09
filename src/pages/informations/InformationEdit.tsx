import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPage, updatePage } from "../../services/informationService";

export default function InformationEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await getPage(Number(id));
        const data = response.data;

        setTitle(data.title);
        setContent(data.content);
        setStatus(data.status || "DRAFT");
        setExistingThumbnailUrl(`${import.meta.env.VITE_API_URL}${data.thumbnail}`); 
      } catch (err) {
        console.error("Erreur lors du chargement de l'article :", err);
        navigate("/informations");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("status", status);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      await updatePage(Number(id), formData);
      navigate("/informations");
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
    }
  };

  if (loading) {
    return <div>Chargement de l'article...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Modifier l’article</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label className="block mb-1 font-medium">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-10 rounded bg-gray-100 px-3 mb-4 text-black placeholder:text-gray-500 cursor-pointer"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Contenu</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-10 rounded bg-gray-100 px-3 py-2 mb-4 text-black placeholder:text-gray-500 cursor-pointer"
            rows={6}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Statut</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full h-10 rounded bg-gray-100 px-3 mb-4 text-black placeholder:text-gray-500 cursor-pointer"
            required
          >
            <option value="PUBLISHED">Publié</option>
            <option value="DRAFT">Brouillon</option>
            <option value="HIDDEN">Caché</option>
          </select>
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
