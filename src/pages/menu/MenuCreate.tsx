import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPages } from "../../services/informationService";
import { createMenu } from "../../services/menuService";

export default function MenuCreate() {
  const [label, setLabel] = useState("");
  const [pageIds, setPageIds] = useState<number[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPages().then((res) => setPages(res.data.items || []));
  }, []);

  const handleCheckbox = (id: number) => {
    setPageIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMenu({ label, pageIds });
    navigate("/menus");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Créer un menu</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nom du menu</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-100"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Pages liées</label>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {pages.map((page) => (
              <label key={page.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={pageIds.includes(page.id)}
                  onChange={() => handleCheckbox(page.id)}
                />
                {page.title}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Enregistrer
        </button>
      </form>
    </div>
  );
}