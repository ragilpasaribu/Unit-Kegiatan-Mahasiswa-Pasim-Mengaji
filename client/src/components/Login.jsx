import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../service/AuthService";
import { saveToken } from "../service/AuthService";

import { User, Lock, Moon, BookOpen, LogIn } from "lucide-react";

import bgImage from "../assets/background.png";
import logo from "../assets/ikon.png";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login(form);

      saveToken(res.token);
      toast.success("Login berhasil ");

      const role = JSON.parse(atob(res.token.split(".")[1])).role;

     if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "PENGURUS") {
        navigate("/pengurus");
      } else {
        navigate("/anggota");
      }
    } catch (err) {
      toast.error("Email atau password salah");
    }
  };

  return (
    <div
      className="min-h-screen grid md:grid-cols-2"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,50,0,0.8), rgba(0,0,0,0.9)),
          url(${bgImage})
        `,
      }}
    >
      {/* 🔥 KIRI (QUOTE) */}
      <div className="hidden md:flex flex-col justify-center items-center text-white p-10 text-center">
        <Moon size={60} className="mb-6 text-green-400" />

        <h1 className="text-2xl font-bold leading-relaxed">
          "Barang siapa menempuh jalan untuk mencari ilmu,
          maka Allah akan mudahkan baginya jalan menuju surga."
        </h1>

        <p className="mt-6 text-sm text-gray-300 max-w-md">
          Login dan lanjutkan perjalananmu dalam menuntut ilmu,
          karena setiap langkah menuju kebaikan bernilai ibadah.
        </p>

        <div className="flex items-center gap-2 mt-6 text-green-400">
          <BookOpen size={18} />
          <span>Teruslah belajar dan mengaji</span>
        </div>
      </div>

      {/* 🔥 KANAN (FORM LOGIN) */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8">

          {/* LOGO */}
          <div className="flex flex-col items-center mb-6">
            <img src={logo} className="w-16 mb-2" />
            <h2 className="font-bold text-green-800 text-lg">
              UKM PASIM MENGAJI
            </h2>
            <p className="text-xs text-gray-500">Masuk ke akun Anda</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">

            {/* EMAIL */}
            <div className="flex items-center border rounded-lg px-3">
              <User className="text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 outline-none"
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="flex items-center border rounded-lg px-3">
              <Lock className="text-gray-400" size={18} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 outline-none"
                onChange={handleChange}
                required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
            >
              <LogIn size={18} />
              Masuk
            </button>

            {/* REGISTER LINK */}
            <p className="text-sm text-center">
              Belum punya akun?{" "}
              <span
                className="text-green-700 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Daftar
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}