import bgMasjid from "../../assets/bgMasjid.png";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BookOpen,
  Repeat,
  CheckCircle,
  Target,
  Calendar,
  Flame,
  Clock3,
} from "lucide-react";

export default function DashboardHome() {
  const [progress, setProgress] = useState(null);

  const [tasks, setTasks] = useState([]);
 useEffect(() => {
  const fetchProgress = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/program/me",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setProgress(res.data?.tahfidzProgress);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/program/task/me",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchProgress();
  fetchTasks();
}, []);

  

 
  const targetType = progress?.targetType || "HARIAN";
  const todaySchedule = "19:00 - Setoran";
  const streak = 5;

 
  const percent = progress?.totalSetoran
    ? Math.min((progress.totalSetoran / 50) * 100, 100)
    : 0;

  return (
    
    <div className="space-y-6">

      {/* ================= HADITS ================= */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-lg animate-fadeIn"
        style={{
          backgroundImage: `url(${bgMasjid})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/90 to-ywllow-800/70"></div>

        <div className="relative z-10 p-8 text-white">
          <div className="ml-auto max-w-xl text-right space-y-2">
            <div className="text-3xl opacity-70">❝</div>

            <h2
              className="text-xl md:text-2xl leading-relaxed tracking-wide"
              style={{ fontFamily: "Amiri, serif" }}
            >
              خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
            </h2>

            <p className="text-sm md:text-base text-green-100 tracking-wide">
              “Sebaik-baik kalian adalah orang yang belajar Al-Qur’an dan mengajarkannya.”
            </p>

            <p className="text-xs text-green-200">(HR. Bukhari)</p>
          </div>
        </div>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* ================= 1. PROGRESS ================= */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">📖 Progress Saya</h3>

          {!progress ? (
            <div className="animate-pulse h-20 bg-gray-100 rounded"></div>
          ) : (
            <div className="space-y-3 text-sm">

              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>
                  <b>{progress.currentSurah}</b> ayat {progress.currentAyah}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                <span>Setoran: <b>{progress.totalSetoran}</b></span>
              </div>

              <div className="flex items-center gap-2">
                <Repeat size={16} />
                <span>Ulang: <b>{progress.totalUlang}</b></span>
              </div>

            
              <div className="mt-3">
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-green-600 h-2 rounded transition-all"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {percent.toFixed(0)}% target tercapai
                </p>
              </div>

            </div>
          )}
        </div>

        {/* ================= 2. TARGET ================= */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">🎯 Target</h3>

          <div className="flex items-center gap-2 text-sm">
            <Target size={16} />
            <span>
              Target kamu: <b>{targetType}</b>
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Konsisten setiap {targetType.toLowerCase()} 💪
          </p>
        </div>

        {/* ================= 3. JADWAL ================= */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">📅 Jadwal Hari Ini</h3>

          <div className="flex items-center gap-2 text-sm">
            <Calendar size={16} />
            <span>{todaySchedule}</span>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Jangan sampai terlewat ya ⏰
          </p>
        </div>

        {/* ================= 4. STREAK ================= */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">🔥 Konsistensi</h3>

          <div className="flex items-center gap-2 text-sm">
            <Flame size={16} className="text-orange-500" />
            <span>
              <b>{streak} hari</b> berturut-turut setor
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Pertahankan semangatmu 🚀
          </p>
        </div>

      </div>

      {/* ================= TASK TAHFIDZ ================= */}
<div className="bg-white p-6 rounded-xl shadow">
  <div className="flex items-center justify-between mb-4">

    <h3 className="text-lg font-semibold">
      📚 Task Tahfidz
    </h3>

    <span className="text-sm text-green-600 font-medium">
      {tasks.length} Task
    </span>

  </div>

  {tasks.length === 0 ? (
    <div className="text-center py-6 text-gray-500">
      Belum ada task dari pengurus ✨
    </div>
  ) : (
    <div className="space-y-4">

      {tasks.map((task) => (
        <div
          key={task.id}
          className="border rounded-xl p-4 hover:shadow transition"
        >

          <div className="flex justify-between items-start">

            {/* LEFT */}
            <div className="space-y-2">

              <div className="flex items-center gap-2">
                <BookOpen
                  size={18}
                  className="text-green-600"
                />

                <h4 className="font-semibold text-gray-800">
                  {task.surah}
                </h4>
              </div>

              <p className="text-sm text-gray-600">
                Ayat {task.startAyah} - {task.endAyah}
              </p>

              {task.note && (
                <p className="text-sm text-gray-500">
                  📝 {task.note}
                </p>
              )}

            </div>

            {/* RIGHT */}
            <div>
              {task.active ? (
                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                  <Clock3 size={14} />
                  Aktif
                </div>
              ) : (
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  <CheckCircle size={14} />
                  Selesai
                </div>
              )}
            </div>

          </div>

        </div>
      ))}

    </div>
  )}
</div>

    </div>
  );
}