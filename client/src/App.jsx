import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

import DashboardLayout from "./layout/DashboardLayout";

// ================= ANGGOTA =================
import DashboardHome from "./pages/anggota/Anggotahome";
import Program from "./pages/pengurus/Program";
import Jadwal from "./pages/Jadwal";
import Progress from "./pages/Progress";
import Profil from "./pages/Profil";
import Tahfidz from "./pages/anggota/Tahfidz";

// ================= PENGURUS =================
import PengurusHome from "./pages/pengurus/Home";
import PengurusProgram from "./pages/pengurus/Program";
import PengurusTask from "./pages/pengurus/Task";

// ================= ADMIN =================
import AdminHome from "./pages/admin/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= ANGGOTA ================= */}
        <Route
          path="/anggota"
          element={
            <ProtectedRoute role="ANGGOTA">
              <DashboardLayout role="ANGGOTA" />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="program" element={<Program />} />
          <Route path="jadwal" element={<Jadwal />} />
          <Route path="progress" element={<Progress />} />
          <Route path="profil" element={<Profil />} />
          <Route path="tahfidz" element={<Tahfidz />} />
        </Route>

        {/* ================= PENGURUS ================= */}
        <Route
          path="/pengurus"
          element={
            <ProtectedRoute role="PENGURUS">
              <DashboardLayout role="PENGURUS" />
            </ProtectedRoute>
          }
        >
          <Route index element={<PengurusHome />} />
          <Route path="program" element={<PengurusProgram />} />
          <Route path="task" element={<PengurusTask />} />
        </Route>

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <DashboardLayout role="ADMIN" />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;