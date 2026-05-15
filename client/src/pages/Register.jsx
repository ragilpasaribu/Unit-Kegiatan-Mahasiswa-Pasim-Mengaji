import { useState } from "react";
import { register } from "../service/AuthService";
import { useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  Moon,
  BookOpen,
} from "lucide-react";

import bgImage from "../assets/background.png";
import logo from "../assets/ikon.png";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ANGGOTA",
    programStudi: "TEKNIK_INFORMATIKA",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const strongPassword =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;

    if (!strongPassword.test(form.password)) {
      toast.error("Password Harus Kuat");
      return;
    }

    try {
      await register(form);
      toast.success("Registrasi berhasil! Menunggu persetujuan admin.");
      navigate("/");
    } catch (err) {
      toast.error("Register gagal");
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
      
      <div className="hidden md:flex flex-col justify-center items-center text-white p-10 text-center">
        <Moon size={60} className="mb-6 text-green-400" />

        <h1 className="text-2xl font-bold leading-relaxed">
          "Ilmu adalah cahaya yang menerangi hati, <br />
          dan Al-Qur’an adalah petunjuk menuju kehidupan yang berarti."
        </h1>

        <p className="mt-6 text-sm text-gray-300 max-w-md">
          Mari bersama mengaji, memahami, dan mengamalkan.
          Setiap ayat yang kita baca hari ini akan menjadi
          bekal untuk masa depan dan akhirat nanti.
        </p>

        <div className="flex items-center gap-2 mt-6 text-green-400">
          <BookOpen size={18} />
          <span>Yuk jadi generasi Qurani</span>
        </div>
      </div>

    
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8">

          {/* LOGO */}
          <div className="flex flex-col items-center mb-6">
            <img src={logo} className="w-16 mb-2" />
            <h2 className="font-bold text-green-800 text-lg">
              UKM PASIM MENGAJI
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

           
            <div className="flex items-center border rounded-lg px-3">
              <User className="text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                placeholder="Nama Lengkap"
                className="w-full p-3 outline-none"
                onChange={handleChange}
                required
              />
            </div>

           
            <div className="flex items-center border rounded-lg px-3">
              <Mail className="text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 outline-none"
                onChange={handleChange}
                required
              />
            </div>

           
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

         
            <select
              name="role"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
            >
              <option value="ANGGOTA">Anggota</option>
              <option value="PENGURUS">Pengurus</option>
            </select>

          
            <select
              name="programStudi"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
            >
              <option value="TEKNIK_INFORMATIKA">Teknik Informatika</option>
              <option value="TEKNIK_INDUSTRI">Teknik Industri</option>
              <option value="SASTRA_INGGRIS">Sastra Inggris</option>
              <option value="SASTRA_JEPANG">Sastra Jepang</option>
              <option value="MANAJEMEN">Manajemen</option>
              <option value="AKUNTANSI">Akuntansi</option>
              <option value="PSIKOLOGI">Psikologi</option>
            </select>

          
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
            >
              <User size={18} />
              Daftar Sekarang
            </button>

           
            <p className="text-sm text-center">
              Sudah punya akun?{" "}
              <span
                className="text-green-700 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}