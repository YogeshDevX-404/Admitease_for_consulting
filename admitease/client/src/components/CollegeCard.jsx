import { Link } from 'react-router-dom';

export default function CollegeCard({ college }) {
  const openEnquiry = () => {
    window.dispatchEvent(new CustomEvent('open-enquiry', { detail: { collegeName: college.name, slug: college.slug } }));
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={college.images?.[0] || 'https://images.unsplash.com/photo-1562774053-701939374585?w=600'}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {college.featured && (
          <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            ⭐ Featured
          </span>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
          {college.rating} ★
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display font-bold text-gray-900 text-lg leading-tight mb-1 group-hover:text-blue-700 transition-colors">
          {college.name}
        </h3>
        <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
          <span>📍</span> {college.location}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {college.courses?.slice(0, 4).map((c) => (
            <span key={c} className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">{c}</span>
          ))}
          {college.courses?.length > 4 && (
            <span className="bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-full">+{college.courses.length - 4}</span>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400">Annual Fees</p>
            <p className="text-sm font-semibold text-gray-800">{college.feesRange?.display || 'Contact us'}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Affiliation</p>
            <p className="text-xs font-medium text-gray-600 max-w-[120px] text-right leading-tight">{college.affiliation}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link to={`/colleges/${college.slug}`}
            className="flex-1 text-center bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold py-2.5 rounded-xl transition-colors">
            View Details
          </Link>
          <button onClick={openEnquiry}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-all hover:shadow-md">
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
}
