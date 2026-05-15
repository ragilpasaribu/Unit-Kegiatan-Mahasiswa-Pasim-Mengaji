import {
  Users,
  BookOpen,
  ClipboardList,
  CheckCircle,
  Clock3,
  TrendingUp,
  CalendarDays,
  Bell,
} from "lucide-react";

const Home = () => {
  // ================= DUMMY DATA =================
  const stats = [
    {
      title: "Total Anggota",
      value: 128,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Program Aktif",
      value: 6,
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      title: "Task Aktif",
      value: 24,
      icon: ClipboardList,
      color: "bg-yellow-500",
    },
    {
      title: "Setoran Hari Ini",
      value: 18,
      icon: CheckCircle,
      color: "bg-purple-500",
    },
  ];

  const recentActivities = [
    {
      user: "Ahmad Fauzan",
      action: "mengumpulkan setoran",
      surah: "Al-Baqarah 1-5",
      time: "10 menit lalu",
    },
    {
      user: "Siti Aisyah",
      action: "menyelesaikan task",
      surah: "An-Naba 1-20",
      time: "25 menit lalu",
    },
    {
      user: "Rizki",
      action: "bergabung ke program Tahfidz",
      surah: "-",
      time: "1 jam lalu",
    },
  ];

  const upcomingSchedules = [
    {
      title: "Setoran Tahfidz",
      time: "19:00 WIB",
    },
    {
      title: "Kajian Rutin",
      time: "20:00 WIB",
    },
    {
      title: "Evaluasi Mingguan",
      time: "Jumat 21:00",
    },
  ];

  return (
    <div className="space-y-6">

      {/* ================= WELCOME ================= */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-500 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Assalamu’alaikum Pengurus 👋
        </h1>

        <p className="text-green-100 max-w-2xl">
          Selamat datang di dashboard pengurus UKM PASIM Mengaji.
          Pantau anggota, program, task, dan perkembangan hafalan
          dalam satu tempat.
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow p-5 flex items-center justify-between hover:shadow-lg transition"
            >
              <div>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-1">
                  {item.value}
                </h2>
              </div>

              <div
                className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white`}
              >
                <Icon size={28} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= CONTENT GRID ================= */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* ================= AKTIVITAS ================= */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-gray-800">
              Aktivitas Terbaru
            </h2>

            <TrendingUp className="text-green-600" />
          </div>

          <div className="space-y-4">
            {recentActivities.map((item, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.user}
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      {item.action}
                    </p>

                    <p className="text-sm text-green-700 mt-1">
                      {item.surah}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock3 size={14} />
                    {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SIDEBAR ================= */}
        <div className="space-y-6">

          {/* ================= JADWAL ================= */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Jadwal
              </h2>

              <CalendarDays className="text-green-600" />
            </div>

            <div className="space-y-3">
              {upcomingSchedules.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-3"
                >
                  <p className="font-medium text-gray-700">
                    {item.title}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= PENGUMUMAN ================= */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Pengumuman
              </h2>

              <Bell className="text-yellow-500" />
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="border-l-4 border-green-500 pl-3">
                Evaluasi hafalan akan dilakukan hari Jumat.
              </div>

              <div className="border-l-4 border-yellow-500 pl-3">
                Jangan lupa update progress anggota.
              </div>

              <div className="border-l-4 border-blue-500 pl-3">
                Kajian rutin dimulai pukul 20:00 WIB.
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;