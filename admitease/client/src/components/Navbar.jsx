// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const location = useLocation();
//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">A</span>
//             </div>
//             <span className="font-display font-bold text-xl text-gray-900">
//               Admit<span className="text-blue-600">Ease</span>
//             </span>
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center gap-8">
//             <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Home</Link>
//             <Link to="/colleges" className={`text-sm font-medium transition-colors ${isActive('/colleges') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Colleges</Link>
//             <a href="#why-us" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">About</a>
//           </div>

//           {/* CTA */}
//           <div className="hidden md:flex items-center gap-3">
//             <Link to="/admin/login" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Admin</Link>
//             <EnquiryButton />
//           </div>

//           {/* Mobile toggle */}
//           <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
//             <div className="space-y-1.5">
//               <span className={`block w-6 h-0.5 bg-gray-600 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
//               <span className={`block w-6 h-0.5 bg-gray-600 transition-all ${open ? 'opacity-0' : ''}`}></span>
//               <span className={`block w-6 h-0.5 bg-gray-600 transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
//             </div>
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {open && (
//           <div className="md:hidden pb-4 pt-2 border-t border-gray-100 space-y-3">
//             <Link to="/" className="block py-2 text-sm text-gray-600" onClick={() => setOpen(false)}>Home</Link>
//             <Link to="/colleges" className="block py-2 text-sm text-gray-600" onClick={() => setOpen(false)}>Colleges</Link>
//             <EnquiryButton />
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// function EnquiryButton() {
//   return (
//     <button
//       onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry'))}
//       className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-200"
//     >
//       Free Counselling
//     </button>
//   );
// }





import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* 🔶 TOP CONTACT BAR */}
      <div className="bg-orange-500 text-white text-sm px-6 py-2 flex justify-between items-center">
        <div className="flex gap-6 flex-wrap">
          <span>📞 +91 6390702639</span>
          <span>✉️ info@admitease.in</span>
        </div>

        <div className="hidden md:block text-center flex-1">
          Apply Online & Get Direct Admission in Colleges & Universities
        </div>

        <button className="bg-blue-900 px-4 py-1 rounded text-xs">
          Free Listing
        </button>
      </div>

      {/* 🔍 FILTER BAR */}
      <div className="bg-blue-900 px-4 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-3">

          {/* COUNTRY */}
          <select className="p-3 rounded text-sm">
            <option>India</option>
          </select>

          {/* STATE */}
          <select className="p-3 rounded text-sm">
            <option>Select State</option>
            <option>Uttar Pradesh</option>
            <option>Delhi</option>
            <option>Maharashtra</option>
            <option>Karnataka</option>
            <option>Tamil Nadu</option>
            <option>Rajasthan</option>
            <option>Gujarat</option>
            <option>Punjab</option>
            <option>Haryana</option>
            <option>Madhya Pradesh</option>
            <option>West Bengal</option>
            <option>Telangana</option>
            <option>Andhra Pradesh</option>
            <option>Kerala</option>
            <option>Bihar</option>
          </select>

          {/* CITY */}
          <select className="p-3 rounded text-sm">
            <option>Select City</option>
            <option>Lucknow</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Bangalore</option>
            <option>Chennai</option>
            <option>Hyderabad</option>
            <option>Kolkata</option>
            <option>Jaipur</option>
            <option>Ahmedabad</option>
            <option>Chandigarh</option>
            <option>Bhopal</option>
            <option>Indore</option>
            <option>Patna</option>
            <option>Kochi</option>
          </select>

          {/* INTERESTED IN (Top Colleges - Mostly Lucknow) */}
          <select className="p-3 rounded text-sm">
            <option>Select College</option>

            {/* Lucknow Colleges */}
            <option>IIT Kanpur</option>
            <option>AIMT Lucknow</option>
            <option>IIM Lucknow</option>
            <option>AKTU Lucknow</option>
            <option>Amity University Lucknow</option>
            <option>BBD University</option>
            <option>Integral University</option>
            <option>SRMU Lucknow</option>
            <option>LU (Lucknow University)</option>
            <option>RML University</option>
            <option>Era University</option>

            {/* Other Top Colleges */}
            <option>Delhi University</option>
            <option>JNU Delhi</option>
            <option>Anna University</option>
            <option>VIT Vellore</option>
            <option>SRM Chennai</option>
            <option>Christ University</option>
            <option>Manipal University</option>
            <option>Symbiosis Pune</option>
            <option>NMIMS Mumbai</option>
            <option>Jamia Millia Islamia</option>
          </select>

          <button className="bg-orange-500 text-white font-semibold rounded px-4 py-3 text-sm hover:bg-orange-600 transition">
            Search 🔍
          </button>
          <button
            onClick={() => navigate("/admin/login")}
            className="bg-orange-500 text-white font-semibold rounded px-4 py-3 hover:bg-blue-800 transition"
          >
            Admin
          </button>
        </div>
      </div>

      {/* 🧭 MAIN NAVBAR */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-900">
          Admit<span className="text-orange-500">Ease</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/colleges" className="hover:text-blue-600">College</Link>
          <Link to="#" className="hover:text-blue-600">University</Link>
          <Link to="#" className="hover:text-blue-600">School</Link>
          <Link to="#" className="hover:text-blue-600">Coaching</Link>
          <Link to="#" className="hover:text-blue-600">Contact</Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition">
            Submit Fees
          </button>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry"))}
            className="bg-blue-900 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-800 transition"
          >
            Admission Enquiry
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </nav>

      {/* 📱 MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4 shadow-md">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/colleges" onClick={() => setOpen(false)}>Colleges</Link>

          <button className="w-full bg-orange-500 text-white py-2 rounded">
            Submit Fees
          </button>

          <button
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new CustomEvent("open-enquiry"));
            }}
            className="w-full bg-blue-900 text-white py-2 rounded"
          >
            Admission Enquiry
          </button>
        </div>
      )}
    </>
  );
}