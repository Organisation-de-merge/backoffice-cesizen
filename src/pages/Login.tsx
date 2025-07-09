import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { login as loginApi } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await loginApi({ email, password });
      const { access_token, user } = response.data;
  
      if (!access_token || !user) {
        alert("Réponse invalide du serveur.");
        return;
      }
  
      const userLevel = user.role?.level ?? 0;
  
      if (userLevel >= 60) {
        login(user, access_token);
        navigate("/dashboard");
      } else {
        alert("Accès refusé : vous n'avez pas les droits nécessaires pour acceder à cette page.");
      }
    } catch (err) {
      console.error("Erreur de connexion :", err);
      alert("Erreur lors de la connexion.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h1 className="text-3xl font-bold mb-6">Connexion 2</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-10 rounded bg-gray-100 px-3 mb-4 text-black placeholder:text-gray-500 italic cursor-pointer"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-10 rounded bg-gray-100 px-3 mb-4 text-black placeholder:text-gray-500 italic cursor-pointer"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded cursor-pointer"
          disabled={!email || !password}
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}