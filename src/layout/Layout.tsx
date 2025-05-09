import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import clsx from "clsx";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useUser();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", minRole: 60 },
    { to: "/informations", label: "Articles d'information", minRole: 60 },
    { to: "/activities", label: "Activités", minRole: 60 },
    { to: "/menus", label: "Menus", minRole: 80 },
    { to: "/users", label: "Utilisateurs", minRole: 80 },
    { to: "/activity-types", label: "Types d'activité", minRole: 100 },
    { to: "/roles", label: "Rôles", minRole: 100 },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full text-white-100 bg-white-900">
      <aside className="w-64 bg-white-800 p-6 space-y-4 shadow-lg">
        <h2 className="text-2xl font-bold text-black mb-6">Backoffice</h2>
        <nav className="space-y-2">
          {navItems
            .filter(item => (user?.role.level ?? 0) >= item.minRole)
            .map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={clsx(
                  "block px-3 py-2 rounded hover:bg-white-700",
                  location.pathname.startsWith(to) && "bg-white-700 font-semibold"
                )}
              >
                {label}
              </Link>
            ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 w-full text-left px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Se déconnecter
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}