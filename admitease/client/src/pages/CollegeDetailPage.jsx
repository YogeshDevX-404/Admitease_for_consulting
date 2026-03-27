import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../utils/api';
import EnquiryModal from '../components/EnquiryModal';

export default function CollegeDetailPage() {
  const { slug } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    API.get(`/colleges/${slug}`)
      .then(res => setCollege(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const openEnquiry = (msg) => {
    window.dispatchEvent(new CustomEvent('open-enquiry', {
      detail: { collegeName: college?.name, slug: college?.slug }
    }));
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!college) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-2xl font-display text-gray-800">College not found</h2>
      <Link to="/colleges" className="text-blue-600 hover:underline">← Back to colleges</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <EnquiryModal />

      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={college.images?.[activeImage] || 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200'}
          alt={college.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <Link to="/colleges" className="text-white/70 hover:text-white text-sm flex items-center gap-1 mb-3">← Back to Colleges</Link>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                {college.featured && <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block">⭐ Featured</span>}
                <h1 className="font-display text-3xl md:text-4xl font-bold text-white">{college.name}</h1>
                <p className="text-blue-200 mt-1 flex items-center gap-2">📍 {college.location}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-5 py-3 text-white">
                <div className="text-2xl font-bold">{college.rating} ★</div>
                <div className="text-xs text-white/70">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Thumbnails */}
      {college.images?.length > 1 && (
        <div className="bg-white border-b border-gray-100 py-3">
          <div className="max-w-7xl mx-auto px-4 flex gap-3 overflow-x-auto">
            {college.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImage(i)}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden ring-2 transition-all ${activeImage === i ? 'ring-blue-600' : 'ring-transparent opacity-60 hover:opacity-100'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4">About the College</h2>
              <p className="text-gray-600 leading-relaxed">{college.description}</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">Established</p>
                  <p className="text-lg font-bold text-gray-900">{college.established || 'N/A'}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">Affiliation</p>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{college.affiliation}</p>
                </div>
              </div>
            </div>

            {/* Courses */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Courses Offered</h2>
              <div className="flex flex-wrap gap-2">
                {college.courses?.map(c => (
                  <span key={c} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full">{c}</span>
                ))}
              </div>
            </div>

            {/* Fees */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Fees Overview</h2>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-500">Annual Fees Range</p>
                  <p className="text-3xl font-bold text-blue-700 mt-1">{college.feesRange?.display || 'Contact for details'}</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm text-amber-800">💡 Fees vary by course. Contact our counsellor for exact fee structure and scholarship information.</p>
              </div>
            </div>

            {/* Placement */}
            {college.placementHighlights && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Placement Highlights</h2>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">🏆</div>
                  <p className="text-gray-600 leading-relaxed">{college.placementHighlights}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-6 text-white sticky top-24">
              <h3 className="font-display text-xl font-bold mb-2">Interested in this College?</h3>
              <p className="text-blue-100 text-sm mb-6">Get expert guidance from our counsellors. All details are strictly confidential.</p>

              <button onClick={() => openEnquiry('apply')}
                className="w-full bg-white text-blue-700 font-bold py-3.5 rounded-xl hover:bg-blue-50 transition-colors mb-3 text-sm">
                Apply With Counsellor
              </button>
              <button onClick={() => openEnquiry('talk')}
                className="w-full bg-blue-600/50 border border-blue-400 text-white font-semibold py-3.5 rounded-xl hover:bg-blue-600 transition-colors text-sm">
                📞 Talk to Expert
              </button>

              <div className="mt-4 pt-4 border-t border-blue-600/50">
                <p className="text-blue-200 text-xs text-center">🔒 No direct college contact shared. We guide you through the process.</p>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Location</span>
                  <span className="text-sm font-medium text-gray-800 text-right max-w-[160px]">{college.location}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Total Courses</span>
                  <span className="text-sm font-bold text-blue-700">{college.courses?.length}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Min Fees</span>
                  <span className="text-sm font-medium text-gray-800">₹{college.feesRange?.min?.toLocaleString('en-IN')}/yr</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-500">Rating</span>
                  <span className="text-sm font-bold text-yellow-600">{college.rating} / 5 ★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
