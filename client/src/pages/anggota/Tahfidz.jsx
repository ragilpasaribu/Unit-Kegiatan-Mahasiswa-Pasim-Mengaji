import { useEffect, useState } from "react";
import axios from "axios";
import {
  BookOpen,
  Repeat,
  CheckCircle,
  Flame,
  Search,
  Calendar,
  FileText,
  ClipboardList
} from "lucide-react";

export default function Tahfidz() {
  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProgress();
    fetchTasks();
  }, []);

  // ================= PROGRESS =================
  const fetchProgress = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/program/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data?.tahfidzProgress);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= TASK =================
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/program/task/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const percent = data?.totalSetoran
    ? Math.min((data.totalSetoran / 50) * 100, 100)
    : 0;

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">

        <div>
          <h2 className="text-xl font-bold text-green-700">
            📖 Kelas Tahfidz
          </h2>

          <p className="text-sm text-gray-500">
            Belajar, setor, dan pantau hafalanmu
          </p>
        </div>

        <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
          <Search size={16} className="text-gray-400" />

          <input
            type="text"
            placeholder="Cari surah..."
            className="ml-2 bg-transparent outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* ================= PROGRESS ================= */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4 col-span-2">

          <h3 className="font-semibold text-gray-800">
            Progress Hafalan
          </h3>

          {!data ? (
            <div className="animate-pulse h-20 bg-gray-100 rounded"></div>
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen size={16} />

                <span>
                  <b>{data.currentSurah || "-"}</b> ayat {data.currentAyah || 0}
                </span>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded">
                <div
                  className="bg-green-600 h-3 rounded transition-all"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              <p className="text-xs text-gray-500">
                {percent.toFixed(0)}% target tercapai
              </p>

              <div className="flex gap-4 pt-2 text-sm">

                <div className="flex items-center gap-1">
                  <CheckCircle size={14} />
                  {data.totalSetoran}
                </div>

                <div className="flex items-center gap-1">
                  <Repeat size={14} />
                  {data.totalUlang}
                </div>

                <div className="flex items-center gap-1 text-orange-500">
                  <Flame size={14} />
                  5 hari
                </div>

              </div>
            </>
          )}
        </div>

        {/* ================= JADWAL ================= */}
        <div className="bg-white p-6 rounded-xl shadow space-y-3">

          <h3 className="font-semibold text-gray-800">
            📅 Jadwal Setoran
          </h3>

          <div className="flex items-center gap-2 text-sm">
            <Calendar size={16} />
            <span>19:00 - Ustadz Ahmad</span>
          </div>

          <p className="text-xs text-gray-500">
            Jangan sampai terlewat ya
          </p>
        </div>

      </div>

      {/* ================= TASK HAFALAN ================= */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">

        <div className="flex items-center gap-2">
          <ClipboardList className="text-green-600" size={20} />

          <h3 className="font-semibold text-gray-800">
            📌 Task Hafalan dari Pengurus
          </h3>
        </div>

        {tasks.length === 0 ? (
          <p className="text-sm text-gray-500">
            Belum ada task hafalan
          </p>
        ) : (
          <div className="space-y-3">

            {tasks.map((task) => (
              <div
                key={task.id}
                className="border rounded-xl p-4 bg-green-50"
              >

                <div className="flex justify-between items-center">

                  <div>
                    <h4 className="font-semibold text-green-700">
                      {task.surah}
                    </h4>

                    <p className="text-sm text-gray-600">
                      Ayat {task.startAyah} - {task.endAyah}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      task.active
                        ? "bg-green-200 text-green-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {task.active ? "Aktif" : "Selesai"}
                  </span>

                </div>

                {task.note && (
                  <p className="text-sm text-gray-500 mt-2">
                    📝 {task.note}
                  </p>
                )}

              </div>
            ))}

          </div>
        )}
      </div>

      {/* ================= RIWAYAT ================= */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">

        <h3 className="font-semibold text-gray-800">
          📊 Riwayat Setoran
        </h3>

        <div className="space-y-3 text-sm">

          <div className="flex justify-between border-b pb-2">
            <span>Al-Fatihah</span>
            <span className="text-green-600">LANCAR</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>Al-Baqarah 1-5</span>
            <span className="text-yellow-600">ULANG</span>
          </div>

        </div>
      </div>

      {/* ================= ACTION ================= */}
      <div className="flex gap-3">

        <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
          Setor Hafalan
        </button>

        <button className="px-4 py-2 border border-green-600 text-green-700 rounded-lg">
          Update Progress
        </button>

      </div>

    </div>
  );
}