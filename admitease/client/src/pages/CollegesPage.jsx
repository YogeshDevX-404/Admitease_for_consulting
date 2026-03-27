import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../utils/api';
import CollegeCard from '../components/CollegeCard';
import EnquiryModal from '../components/EnquiryModal';

const COURSES = ['All', 'B.Tech', 'MBA', 'MBBS', 'BCA', 'MCA', 'LLB', 'BBA', 'B.Sc', 'B.Pharm', 'BDS', 'B.Arch', 'B.Com'];
const AFFILIATIONS = ['All', 'UGC Approved Private University', 'AKTU Affiliated', 'State University – UGC Approved', 'Private University – NMC Approved', 'Autonomous – Ministry of Education'];
const FEE_RANGES = [
  { label: 'All', min: 0, max: 99999999 },
  { label: 'Under ₹1L/yr', min: 0, max: 100000 },
  { label: '₹1L – ₹2L/yr', min: 100000, max: 200000 },
  { label: '₹2L – ₹5L/yr', min: 200000, max: 500000 },
  { label: 'Above ₹5L/yr', min: 500000, max: 99999999 },
];

export default function CollegesPage() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    course: searchParams.get('course') || 'All',
    affiliation: 'All',
    feeRange: 'All',
    search: searchParams.get('search') || '',
  });

  useEffect(() => {
    fetchColleges();
  }, [filters]);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.course !== 'All') params.course = filters.course;
      if (filters.affiliation !== 'All') params.affiliation = filters.affiliation;
      if (filters.search) params.search = filters.search;
      const feeRange = FEE_RANGES.find(f => f.label === filters.feeRange);
      if (feeRange && filters.feeRange !== 'All') {
        params.minFees = feeRange.min;
        params.maxFees = feeRange.max;
      }
      const res = await API.get('/colleges', { params });
      setColleges(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key, value) => setFilters(f => ({ ...f, [key]: value }));

  return (
    <div className="min-h-screen bg-gray-50">
      <EnquiryModal />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-white mb-2">Explore Colleges in Lucknow</h1>
          <p className="text-blue-100">Find and compare top institutions tailored to your goals</p>
          {/* Search */}
          <div className="mt-6 max-w-xl flex gap-3">
            <input
              value={filters.search}
              onChange={e => updateFilter('search', e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchColleges()}
              placeholder="Search college name..."
              className="flex-1 px-5 py-3.5 rounded-xl text-sm outline-none bg-white text-gray-800 placeholder-gray-400"
            />
            <button onClick={fetchColleges} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-5 flex items-center justify-between">
                Filters
                <button onClick={() => setFilters({ course: 'All', affiliation: 'All', feeRange: 'All', search: '' })}
                  className="text-xs text-blue-600 hover:text-blue-800">Clear All</button>
              </h3>

              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Course</p>
                <div className="space-y-1 max-h-52 overflow-y-auto">
                  {COURSES.map(c => (
                    <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="radio" name="course" checked={filters.course === c} onChange={() => updateFilter('course', c)} className="text-blue-600" />
                      <span className={`text-sm ${filters.course === c ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Annual Fees</p>
                <div className="space-y-1">
                  {FEE_RANGES.map(f => (
                    <label key={f.label} className="flex items-center gap-2.5 cursor-pointer">
                      <input type="radio" name="feeRange" checked={filters.feeRange === f.label} onChange={() => updateFilter('feeRange', f.label)} className="text-blue-600" />
                      <span className={`text-sm ${filters.feeRange === f.label ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>{f.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Affiliation</p>
                <div className="space-y-1 max-h-44 overflow-y-auto">
                  {AFFILIATIONS.map(a => (
                    <label key={a} className="flex items-center gap-2.5 cursor-pointer">
                      <input type="radio" name="affiliation" checked={filters.affiliation === a} onChange={() => updateFilter('affiliation', a)} className="text-blue-600" />
                      <span className={`text-sm ${filters.affiliation === a ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>{a}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Colleges Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 text-sm">
                <span className="font-semibold text-gray-900">{colleges.length}</span> colleges found
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                    <div className="h-48 bg-gray-200 animate-pulse" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
                      <div className="h-3 bg-gray-100 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : colleges.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-display text-xl text-gray-800 mb-2">No colleges found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {colleges.map(college => <CollegeCard key={college._id} college={college} />)}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
