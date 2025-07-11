import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPages } from "../services/informationService";
import { getActivities } from "../services/activityService";
import { getMenus } from "../services/menuService";
import { getUsers } from "../services/userService";
import { useUser } from "../context/UserContext";

export default function Dashboard() {
  const { user } = useUser();
  const roleLevel = user?.role.level || 0;

  const [today, setToday] = useState("");
  const [stats, setStats] = useState({
    articles: 0,
    users: 0,
    activities: 0,
    menus: 0,
  });

  useEffect(() => {
    const now = new Date();
    setToday(
      now.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [articlesRes, usersRes, activitiesRes, menusRes] = await Promise.all([
          getPages(),
          getUsers(),
          getActivities(),
          getMenus(),
        ]);

        setStats({
          articles: articlesRes.data?.totalItems || articlesRes.data.length || 0,
          users: usersRes.data.length || 0,
          activities: activitiesRes.data?.totalItems || activitiesRes.data.length || 0,
          menus: menusRes.data.length || 0,
        });
      } catch (err) {
        console.error("Erreur chargement des statistiques :", err);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Articles",
      value: stats.articles,
      color: "text-green-600",
      link: "/informations",
      minRole: 60,
    },
    {
      label: "Utilisateurs Totaux",
      value: stats.users,
      color: "text-indigo-600",
      link: "/users",
      minRole: 80,
    },
    {
      label: "Activités",
      value: stats.activities,
      color: "text-orange-500",
      link: "/activities",
      minRole: 60,
    },
    {
      label: "Menus",
      value: stats.menus,
      color: "text-pink-500",
      link: "/menus",
      minRole: 80,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-gray-600">Bienvenue dans le backoffice</p>
        <p className="text-sm text-gray-400">{today}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards
          .filter((card) => roleLevel >= card.minRole)
          .map((card) => (
            <div key={card.label} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{card.label}</h2>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
              <Link to={card.link} className="text-blue-500 text-sm hover:underline">
                Gérer les {card.label.toLowerCase()}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
