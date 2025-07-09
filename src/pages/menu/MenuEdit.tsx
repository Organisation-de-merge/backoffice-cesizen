import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMenu, updateMenu } from "../../services/menuService";
import { getPages } from "../../services/informationService";

interface Page {
  id: number;
  title: string;
}

export default function MenuEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [label, setLabel] = useState("");
  const [pageIds, setPageIds] = useState<number[]>([]);
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    if (!id) return;

    getMenu(Number(id)).then((res) => {
      setLabel(res.data.label);
      setPageIds(res.data.pageIds);
    });

    getPages().then((res) => setPages(res.data.items || []));
  }, [id]);

  const handleCheckbox = (pid: number) => {
    setPageIds((prev) =>
      prev.includes(pid) ? prev.filter((p) => p !== pid) : [...prev, pid]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    await updateMenu(Number(id), { label, pageIds });
    navigate("/menus");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Modifier un menu</h1>
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
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}