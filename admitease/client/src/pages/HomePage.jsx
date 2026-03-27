import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import CollegeCard from "../components/CollegeCard";
import EnquiryModal from "../components/EnquiryModal";

/* ---------- DATA ---------- */

const WHY_US = [
  { icon: "🎯", title: "Expert Guidance", desc: "Experienced counsellors with 10+ years." },
  { icon: "🏫", title: "50+ Colleges", desc: "Top colleges across all streams." },
  { icon: "💰", title: "Budget Friendly", desc: "Quality education in your budget." },
  { icon: "📋", title: "Full Support", desc: "Shortlisting to admission." },
  { icon: "⚡", title: "Quick Response", desc: "Callback within 24 hrs." },
  { icon: "🤝", title: "Trusted", desc: "5000+ students placed." }
];

const STATS = [
  { value: "5000+", label: "Students" },
  { value: "50+", label: "Colleges" },
  { value: "98%", label: "Success" },
  { value: "10+", label: "Experience" }
];

const IMAGES = [
  "https://www.lkouniv.ac.in/site/writereaddata/siteContent/202007251035331221UoL_photo.jpeg",
  "https://www.aimt.edu.in/wp-content/uploads/2025/10/Ambalika-Insitute.jpg",
  "https://srmu.ac.in/storage/common-section/1600x483-know-our-campus-2-11zon-21022404365828.jpg",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b",
  "https://images.unsplash.com/photo-1562774053-701939374585",
  "https://images.unsplash.com/photo-1576495199011-eb94736d05d6",
 
];

/* ---------- COMPONENT ---------- */

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  /* ---------- AUTO SLIDER ---------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /* ---------- FETCH ---------- */
  useEffect(() => {
    API.get("/colleges?featured=true")
      .then((res) => setFeatured(res.data.data.slice(0, 6)));
  }, []);

  /* ---------- SEARCH ---------- */
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/colleges?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div>
      <EnquiryModal />

      {/* ================= HERO SLIDER ================= */}
      <section className="relative h-[500px] overflow-hidden">

        <div
          className="flex h-full transition-transform duration-700"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {IMAGES.map((img, i) => (
            <img key={i} src={img} className="w-full h-full object-cover flex-shrink-0" />
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">

          <div className="bg-white/20 px-4 py-1 rounded-full mb-4 text-sm">
            Lucknow's #1 Admission Platform
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find the Right College
          </h1>

          <p className="mb-6 max-w-xl">
            Expert counselling, 50+ colleges, zero cost guidance.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-3 w-full max-w-xl">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search college or course..."
              className="flex-1 px-5 py-3 rounded-full text-black outline-none"
            />
            <button className="bg-orange-500 px-6 py-3 rounded-full font-semibold">
              Search
            </button>
            
          </form>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-blue-900 text-white py-6 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm text-blue-200">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Colleges
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 px-4">
          {featured.map((c) => (
            <CollegeCard key={c._id} college={c} />
          ))}
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="py-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Us
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 px-4">
          {WHY_US.map((w) => (
            <div key={w.title} className="p-6 border rounded-xl text-center">
              <div className="text-4xl mb-3">{w.icon}</div>
              <h3 className="font-bold">{w.title}</h3>
              <p className="text-gray-500 text-sm">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-blue-900 text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Start Your Journey?
        </h2>

        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry"))}
          className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold"
        >
          Get Free Counselling
        </button>
      </section>

      {/* ================= WHATSAPP ================= */}
      <a
        href="https://wa.me/+916390702639"
        target="_blank"
        className="fixed bottom-6 left-6 bg-green-500 text-white p-4 rounded-full shadow-lg"
      >
        💬
      </a>

      {/* ================= HELP BUTTON ================= */}
      <button
        onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry"))}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg"
      >
        Need Help?
      </button>

    </div>
  );
}