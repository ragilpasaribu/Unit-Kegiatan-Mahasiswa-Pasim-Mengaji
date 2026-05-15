import { useNavigate } from "react-router-dom";
import { Moon, BookOpen, Users } from "lucide-react";
import bgImage from "../assets/bg.jpg";
import logo from "../assets/ikon.png";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  const { scrollY } = useScroll();


  const yBg = useTransform(scrollY, [0, 500], [0, 150]);


  const yText = useTransform(scrollY, [0, 500], [0, 300]);

  const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };

      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }, []);


  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 }
  };


  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };


  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">

   
      <nav
      className={`w-full fixed top-0 left-0 z-50 flex justify-between items-center px-8 py-4 text-white transition-all duration-300 ${
        scrolled
      ? "bg-gray-900/90 backdrop-blur-md shadow-lg"
      : "bg-transparent"
      }`}
    >
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <h1 className="text-lg font-bold text-green-300">
            PASIM Mengaji
          </h1>
        </div>

        <div className="flex gap-6 items-center text-sm">
          <a href="#home" className="hover:text-green-300">Home</a>
          <a href="#about" className="hover:text-green-300">Tentang</a>
          <a href="#program" className="hover:text-green-300">Program</a>
          <a href="#join" className="hover:text-green-300">Gabung</a>

          <button onClick={() => navigate("/login")} className="hover:text-green-300">
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="border border-green-300 px-4 py-1 rounded hover:bg-green-600"
          >
            Daftar
          </button>
        </div>
      </nav>

   
      <section
        id="home"
        className="h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden"
      >
    
        <motion.div
          style={{ y: yBg }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </motion.div>

    
        <div className="absolute inset-0 bg-black/60"></div>

      
        <motion.div
          style={{ y: yText }}
          className="relative z-10 text-white max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={logo}
            alt="logo"
            className="w-16 h-16 mx-auto mb-4"
          />

          <h1 className="text-5xl font-bold mb-4">
            UKM PASIM MENGAJI
          </h1>

          <p className="text-gray-200 mb-8">
            Wadah bagi mahasiswa untuk belajar Al-Qur'an, memperdalam ilmu agama,
            dan membangun generasi Qurani di kampus PASIM.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Gabung Sekarang
          </button>
        </motion.div>
      </section>

      <motion.section
        id="about"
        className="bg-white text-gray-800 py-16 px-6 text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-4">Tentang Kami</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          UKM PASIM Mengaji adalah komunitas mahasiswa yang fokus pada pembelajaran
          Al-Qur'an, baik dari segi tilawah, tahfidz, maupun kajian keislaman.
          Kami hadir sebagai tempat berkembangnya generasi muda yang berakhlak
          dan berilmu.
        </p>
      </motion.section>

   
      <motion.section
        id="program"
        className="bg-gray-100 py-16 px-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-10">
          Program Kami
        </h2>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={stagger}
        >

     
          <motion.div
            className="bg-white p-6 rounded-lg shadow text-center hover:-translate-y-2 hover:shadow-xl transition"
            variants={item}
          >
            <BookOpen className="mx-auto text-green-500 mb-4" size={40} />
            <h3 className="font-bold text-xl mb-2">Tilawah</h3>
            <p className="text-gray-600">
              Belajar membaca Al-Qur'an dengan tajwid yang benar.
            </p>
          </motion.div>

  
          <motion.div
            className="bg-white p-6 rounded-lg shadow text-center hover:-translate-y-2 hover:shadow-xl transition"
            variants={item}
          >
            <Users className="mx-auto text-green-500 mb-4" size={40} />
            <h3 className="font-bold text-xl mb-2">Halaqoh</h3>
            <p className="text-gray-600">
              Kajian rutin dan diskusi keislaman bersama mentor.
            </p>
          </motion.div>

         
          <motion.div
            className="bg-white p-6 rounded-lg shadow text-center hover:-translate-y-2 hover:shadow-xl transition"
            variants={item}
          >
            <Moon className="mx-auto text-green-500 mb-4" size={40} />
            <h3 className="font-bold text-xl mb-2">Tahfidz</h3>
            <p className="text-gray-600">
              Program menghafal Al-Qur'an dengan bimbingan.
            </p>
          </motion.div>

        </motion.div>
      </motion.section>

      
     <motion.section
        id="join"
        className="bg-gradient-to-r from-green-600 via-green-500 to-green-700 text-white py-16 text-center px-6 relative overflow-hidden"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >

      
        <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-[-50px] left-[-50px]"></div>
        <div className="absolute w-72 h-72 bg-black/10 rounded-full blur-3xl bottom-[-50px] right-[-50px]"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">
            Siap Bergabung?
          </h2>

          <p className="mb-6">
            Jadilah bagian dari generasi Qurani bersama kami
          </p>

          <button
            onClick={() => navigate("/register")}
            className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
          >
            Daftar Sekarang
          </button>
        </div>
      </motion.section>

  
      <footer className="bg-gray-900 text-gray-400 text-center py-4 text-sm">
        © 2026 UKM PASIM Mengaji • All Rights Reserved
      </footer>
    </div>
  );
}