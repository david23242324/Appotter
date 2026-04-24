import { NavLink } from "react-router-dom";
import { House, Heart, Sparkles, Info, User } from "lucide-react";

const Navbar = () => {
  const tabs = [
    { to: "/", icon: House, label: "Home" },
    { to: "/favorites", icon: Heart, label: "Favoritos" },
    { to: "/original", icon: Sparkles, label: "Original" },
    { to: "/info", icon: Info, label: "Info" },
    { to: "/user", icon: User, label: "Usuario" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-yellow-500 z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 w-full h-full transition-colors duration-200
              ${isActive ? "text-yellow-400" : "text-gray-400 hover:text-yellow-300"}`
            }
          >
            <Icon size={22} />
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;