import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../../services/userService";
import { getRoles } from "../../services/roleService";
import { forgotPassword } from "../../services/authService"; 

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState<number>();
  const [roles, setRoles] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null); 

  useEffect(() => {
    getRoles().then((res) => setRoles(res.data));
    if (id) {
      getUser(Number(id)).then((res) => {
        const data = res.data;
        setName(data.name);
        setEmail(data.email);
        setRoleId(data.roleId);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    await updateUser(Number(id), { name, email, roleId: roleId! });
    navigate("/users");
  };

  const handleResetPassword = async () => {
    try {
      await forgotPassword(email);
      setFeedback("Lien de réinitialisation envoyé avec succès !");
    } catch (err) {
      console.error(err);
      setFeedback("Erreur lors de l'envoi du lien.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Modifier un utilisateur</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom"
          className="w-full px-3 py-2 rounded bg-gray-100"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2 rounded bg-gray-100"
          required
        />
        <select
          value={roleId}
          onChange={(e) => setRoleId(Number(e.target.value))}
          className="w-full px-3 py-2 rounded bg-gray-100"
          required
        >
          <option value="">Sélectionner un rôle</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.label}
            </option>
          ))}
        </select>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          >
            Enregistrer
          </button>

          <button
            type="button"
            onClick={handleResetPassword}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Réinitialiser le mot de passe
          </button>
        </div>

        {feedback && <p className="text-sm text-gray-700 mt-2">{feedback}</p>}
      </form>
    </div>
  );
}
