import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Task() {
  const [form, setForm] = useState({
    programMemberId: "",
    surah: "",
    startAyah: "",
    endAyah: "",
    note: "",
  });

  const token = localStorage.getItem("token");

  // ================= CREATE TASK =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:8080/api/program/task?programMemberId=${form.programMemberId}`,
        {
          surah: form.surah,
          startAyah: Number(form.startAyah),
          endAyah: Number(form.endAyah),
          note: form.note,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task berhasil dibuat ✅");

      setForm({
        programMemberId: "",
        surah: "",
        startAyah: "",
        endAyah: "",
        note: "",
      });

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Gagal buat task");
    }
  };

  return (
    <div className="space-y-6">

      {/* ================= FORM ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Buat Task Setoran
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-3">

          <input
            type="number"
            placeholder="Program Member ID"
            value={form.programMemberId}
            onChange={(e) =>
              setForm({ ...form, programMemberId: e.target.value })
            }
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Surah"
            value={form.surah}
            onChange={(e) =>
              setForm({ ...form, surah: e.target.value })
            }
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="Start Ayah"
            value={form.startAyah}
            onChange={(e) =>
              setForm({ ...form, startAyah: e.target.value })
            }
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="End Ayah"
            value={form.endAyah}
            onChange={(e) =>
              setForm({ ...form, endAyah: e.target.value })
            }
            className="border p-2 rounded"
            required
          />

          <textarea
            placeholder="Catatan (opsional)"
            value={form.note}
            onChange={(e) =>
              setForm({ ...form, note: e.target.value })
            }
            className="border p-2 rounded"
          />

          <button className="bg-green-600 text-white py-2 rounded">
            Simpan Task
          </button>

        </form>
      </div>

    </div>
  );
}