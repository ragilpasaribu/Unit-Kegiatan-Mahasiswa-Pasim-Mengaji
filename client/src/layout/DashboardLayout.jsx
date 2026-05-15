import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  User,
  LogOut,
  Gauge,
  Users
} from "lucide-react";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import ikon from "../assets/ikon.png";
import masjid from "../assets/masjid.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";

export default function DashboardLayout({ role }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  const menus = {
    ANGGOTA: [
      { label: "Dashboard", path: "/anggota", icon: LayoutDashboard },
      { label: "Program", path: "/anggota/program", icon: BookOpen },
      { label: "Jadwal", path: "/anggota/jadwal", icon: CalendarCheck },
      { label: "Progress", path: "/anggota/progress", icon: Gauge },
      { label: "Profil", path: "/anggota/profil", icon: User },
    ],
    PENGURUS: [
      { label: "Dashboard", path: "/pengurus", icon: LayoutDashboard },
      { label: "Approve Program", path: "/pengurus/program", icon: BookOpen },
      { label: "Task Tahfidz", path: "/pengurus/task", icon: CalendarCheck },
      { label: "Anggota", path: "/pengurus/anggota", icon: Users },
    ],
  };


  const getTitle = () => {
    const current = menus[role].find((m) =>
      location.pathname.startsWith(m.path)
    );
    return current?.label || "Dashboard";
  };

  const getSubtitle = () => {
    if (role === "ANGGOTA")
      return "Pantau perkembangan hafalan dan belajar mengajimu.";

    if (role === "PENGURUS")
      return "Kelola anggota, program, dan setoran.";

    return "";
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const menuClass = (path) => {
    const isActive = location.pathname.startsWith(path);

    return `flex items-center justify-between cursor-pointer p-3 rounded-xl transition-all duration-200 group ${
      isActive
        ? "bg-white text-green-700 shadow-md"
        : "text-white hover:bg-white hover:text-green-700"
    }`;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div
        className="w-64 text-white flex flex-col p-6 relative overflow-hidden"
        style={{
          backgroundImage: `url(${masjid})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
        }}
      >

        <div className="relative z-10 flex flex-col h-full">

          {/* LOGO */}
          <div className="mb-10 flex items-center gap-3">
            <img
              src={ikon}
              className="w-10 h-10 bg-white p-1 rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold">PASIM Mengaji</h1>
              <p className="text-sm text-green-200">UKM PASIM</p>
            </div>
          </div>

          {/* MENU */}
          <nav className="flex flex-col gap-3">
            {menus[role].map((m, i) => {
              const Icon = m.icon;

              return (
                <div
                  key={i}
                  onClick={() => navigate(m.path)}
                  className={menuClass(m.path)}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    {m.label}
                  </div>

                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100"
                  />
                </div>
              );
            })}
          </nav>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="mt-auto flex items-center justify-center gap-2 border border-white p-3 rounded-xl hover:bg-white hover:text-green-700"
          >
            <LogOut size={18} /> Logout
          </button>

        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8 bg-gray-50">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{getTitle()}</h1>
            <p className="text-gray-500 text-sm">{getSubtitle()}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-gray-500 text-sm">Assalamu’alaikum</p>
              <p className="font-semibold">{user?.name}</p>
            </div>

            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <Outlet />
      </div>
    </div>
  );
}