import { useEffect, useState } from "react";
import axios from "axios";
import { Moon, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Program() {
  const [programs, setPrograms] = useState([]);
  const [myProgram, setMyProgram] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [targetType, setTargetType] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    fetchPrograms();
    fetchMyProgram();
  }, []);


  useEffect(() => {
    if (myProgram?.status === "ACTIVE") {
      if (myProgram.program?.name === "Tahfidz") {
        navigate("/anggota/tahfidz");
      }
    }
  }, [myProgram, navigate]);

  const fetchPrograms = async () => {
    try {
      const res = await api.get("/program");
      setPrograms(res.data);
    } catch (err) {
      toast.error("Gagal ambil program");
    }
  };

  const fetchMyProgram = async () => {
    try {
      const res = await api.get("/program/me");
      setMyProgram(res.data);
    } catch (err) {
      setMyProgram(null);
    }
  };

  const handleConfirmJoin = async () => {
    if (!selectedProgram) return;

    if (selectedProgram.name === "Tahfidz" && !targetType) {
      toast.error("Pilih target dulu!");
      return;
    }

    try {
      setLoading(true);

      await api.post("/program/join", {
        programId: selectedProgram.id,
        targetType: targetType || null,
      });

      toast.success("Berhasil daftar! Menunggu persetujuan 🙌");

      setShowModal(false);
      setTargetType("");
      setSelectedProgram(null);

      fetchMyProgram();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal daftar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* ================= PENDING ================= */}
      {myProgram?.status === "PENDING" && (
        <div className="bg-yellow-100 p-6 rounded-xl text-center">
          <h2 className="text-lg font-semibold text-yellow-800">
            ⏳ Menunggu Persetujuan
          </h2>
          <p className="text-sm text-yellow-700 mt-2">
            Program kamu sedang direview oleh pengurus
          </p>
        </div>
      )}

      {/* ================= BELUM JOIN ================= */}
      {!myProgram && (
        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((p) => (
            <div
              key={p.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              {p.name === "Tahfidz" ? (
                <Moon className="text-green-600 mb-3" />
              ) : (
                <BookOpen className="text-green-600 mb-3" />
              )}

              <h3 className="font-bold text-lg">{p.name}</h3>

              <p className="text-gray-500 mb-4">
                {p.description}
              </p>

              <button
                onClick={() => {
                  setSelectedProgram(p);
                  setShowModal(true);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Daftar
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-xl font-bold mb-4">
              Konfirmasi Program
            </h2>

            <p className="mb-2">
              Program: <b>{selectedProgram?.name}</b>
            </p>

            <p className="text-sm text-gray-500 mb-4">
              {selectedProgram?.description}
            </p>

            {/* 🔥 KHUSUS TAHFIDZ */}
            {selectedProgram?.name === "Tahfidz" && (
              <select
                className="w-full border p-2 mb-4 rounded"
                value={targetType}
                onChange={(e) => setTargetType(e.target.value)}
              >
                <option value="">Pilih target setoran</option>
                <option value="HARIAN">1 Hari 1 Surah</option>
                <option value="MINGGUAN">1 Minggu 1 Surah</option>
                <option value="BULANAN">1 Bulan 1 Surah</option>
              </select>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Batal
              </button>

              <button
                onClick={handleConfirmJoin}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Konfirmasi
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}