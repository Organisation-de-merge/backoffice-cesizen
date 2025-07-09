import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/userService";
import { getRoles } from "../../services/roleService";

interface Role {
  id: number;
  label: string;
}

export default function UserCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState<number>();
  const [roles, setRoles] = useState<Role[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRoles().then((res) => setRoles(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({ name, email, password, roleId: roleId! });
    navigate("/users");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Créer un utilisateur</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" className="w-full px-3 py-2 rounded bg-gray-100" required />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 rounded bg-gray-100" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" className="w-full px-3 py-2 rounded bg-gray-100" required />
        <select value={roleId} onChange={(e) => setRoleId(Number(e.target.value))} className="w-full px-3 py-2 rounded bg-gray-100" required>
          <option value="">Sélectionner un rôle</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>{role.label}</option>
          ))}
        </select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">Créer</button>
      </form>
    </div>
  );
}
