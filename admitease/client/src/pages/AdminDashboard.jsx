import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

const STATUS_COLORS = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-yellow-100 text-yellow-700',
  Converted: 'bg-green-100 text-green-700',
  Closed: 'bg-gray-100 text-gray-600',
};

const COURSES = ['B.Tech', 'MBA', 'MBBS', 'BCA', 'MCA', 'LLB', 'BBA', 'B.Sc', 'B.Pharm', 'BDS', 'B.Arch', 'B.Com'];

const emptyCollege = {
  name: '', location: '', description: '', courses: [], feesRange: { min: 0, max: 0, display: '' },
  affiliation: '', images: [''], featured: false, placementHighlights: '', established: '', rating: 4.0,
};

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const [tab, setTab] = useState('leads');
  const [leads, setLeads] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editCollege, setEditCollege] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyCollege);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => { fetchLeads(); fetchColleges(); }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try { const res = await API.get('/leads'); setLeads(res.data.data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const fetchColleges = async () => {
    try { const res = await API.get('/colleges'); setColleges(res.data.data); }
    catch (e) { console.error(e); }
  };

  const updateLeadStatus = async (id, status) => {
    try {
      await API.put(`/leads/${id}/status`, { status });
      setLeads(leads.map(l => l._id === id ? { ...l, status } : l));
    } catch (e) { console.error(e); }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'courses') {
      const course = value;
      setForm(f => ({ ...f, courses: checked ? [...f.courses, course] : f.courses.filter(c => c !== course) }));
    } else if (name.startsWith('fees_')) {
      const key = name.replace('fees_', '');
      setForm(f => ({ ...f, feesRange: { ...f.feesRange, [key]: type === 'number' ? Number(value) : value } }));
    } else {
      setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleImageChange = (i, val) => {
    const imgs = [...(form.images || [''])];
    imgs[i] = val;
    setForm(f => ({ ...f, images: imgs }));
  };

  const openAddForm = () => { setForm(emptyCollege); setEditCollege(null); setShowForm(true); setMsg(''); };
  const openEditForm = (c) => {
    setForm({ ...c, established: c.established || '', images: c.images?.length ? c.images : [''] });
    setEditCollege(c);
    setShowForm(true);
    setMsg('');
  };

  const saveCollege = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = { ...form, images: form.images.filter(Boolean), established: form.established ? Number(form.established) : undefined };
      if (editCollege) { await API.put(`/colleges/${editCollege._id}`, data); setMsg('College updated!'); }
      else { await API.post('/colleges', data); setMsg('College added!'); }
      await fetchColleges();
      setShowForm(false);
    } catch (err) { setMsg(err.response?.data?.message || 'Error saving college'); }
    finally { setSaving(false); }
  };

  const deleteCollege = async (id) => {
    if (!confirm('Delete this college?')) return;
    try { await API.delete(`/colleges/${id}`); await fetchColleges(); }
    catch (e) { console.error(e); }
  };

  const filteredLeads = statusFilter === 'All' ? leads : leads.filter(l => l.status === statusFilter);
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'New').length,
    converted: leads.filter(l => l.status === 'Converted').length,
    colleges: colleges.length,
  };

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      {/* Topbar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-display font-bold text-xl text-gray-900">Admit<span className="text-blue-600">Ease</span> <span className="text-gray-400 font-normal text-sm">Admin</span></span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">{admin?.email}</span>
            <button onClick={logout} className="text-sm text-red-600 hover:text-red-800 font-medium">Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Leads', value: stats.total, color: 'from-blue-600 to-blue-700', icon: '📋' },
            { label: 'New Leads', value: stats.new, color: 'from-orange-500 to-orange-600', icon: '🔔' },
            { label: 'Converted', value: stats.converted, color: 'from-green-600 to-green-700', icon: '✅' },
            { label: 'Colleges', value: stats.colleges, color: 'from-purple-600 to-purple-700', icon: '🏫' },
          ].map(s => (
            <div key={s.label} className={`bg-gradient-to-br ${s.color} text-white rounded-2xl p-5 shadow-sm`}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-3xl font-bold">{s.value}</div>
              <div className="text-white/80 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-1.5 rounded-xl border border-gray-200 w-fit">
          {['leads', 'colleges'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${tab === t ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
              {t === 'leads' ? '📋 Leads' : '🏫 Colleges'}
            </button>
          ))}
        </div>

        {/* Leads Tab */}
        {tab === 'leads' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-semibold text-gray-900">All Enquiries</h2>
              <div className="flex gap-2">
                {['All', 'New', 'Contacted', 'Converted', 'Closed'].map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      {['Name', 'Phone', 'Email', 'Course', 'College', 'Date', 'Status', 'Action'].map(h => (
                        <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredLeads.map(lead => (
                      <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                        <td className="px-4 py-3 text-gray-600">{lead.phone}</td>
                        <td className="px-4 py-3 text-gray-600 max-w-[150px] truncate">{lead.email}</td>
                        <td className="px-4 py-3"><span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">{lead.interestedCourse}</span></td>
                        <td className="px-4 py-3 text-gray-600 max-w-[130px] truncate">{lead.collegeName || '—'}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{new Date(lead.createdAt).toLocaleDateString('en-IN')}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[lead.status]}`}>{lead.status}</span>
                        </td>
                        <td className="px-4 py-3">
                          <select value={lead.status} onChange={e => updateLeadStatus(lead._id, e.target.value)}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-blue-500 bg-white">
                            {['New', 'Contacted', 'Converted', 'Closed'].map(s => <option key={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                    {filteredLeads.length === 0 && (
                      <tr><td colSpan={8} className="text-center py-12 text-gray-400">No leads found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Colleges Tab */}
        {tab === 'colleges' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-900">Manage Colleges ({colleges.length})</h2>
              <button onClick={openAddForm} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                + Add College
              </button>
            </div>

            {msg && !showForm && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl">{msg}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {colleges.map(c => (
                <div key={c._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="h-36 overflow-hidden">
                    <img src={c.images?.[0] || 'https://images.unsplash.com/photo-1562774053-701939374585?w=400'} alt={c.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 leading-tight">{c.name}</h3>
                    <p className="text-gray-500 text-xs mb-2">📍 {c.location}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {c.courses?.slice(0, 3).map(course => (
                        <span key={course} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">{course}</span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openEditForm(c)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2 rounded-xl transition-colors">Edit</button>
                      <button onClick={() => deleteCollege(c._id)} className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold py-2 rounded-xl transition-colors">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit College Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 bg-gray-900/60 backdrop-blur-sm overflow-y-auto" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-gray-900">{editCollege ? 'Edit College' : 'Add New College'}</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200">×</button>
            </div>
            <form onSubmit={saveCollege} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {msg && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">{msg}</div>}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">College Name *</label>
                  <input name="name" value={form.name} onChange={handleFormChange} required placeholder="Full college name"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Location *</label>
                  <input name="location" value={form.location} onChange={handleFormChange} required placeholder="Area, Lucknow"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Affiliation</label>
                  <input name="affiliation" value={form.affiliation} onChange={handleFormChange} placeholder="e.g. AKTU Affiliated"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description *</label>
                  <textarea name="description" value={form.description} onChange={handleFormChange} required rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Min Fees (₹/yr)</label>
                  <input name="fees_min" type="number" value={form.feesRange?.min} onChange={handleFormChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Max Fees (₹/yr)</label>
                  <input name="fees_max" type="number" value={form.feesRange?.max} onChange={handleFormChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Fees Display Text</label>
                  <input name="fees_display" value={form.feesRange?.display} onChange={handleFormChange} placeholder="e.g. ₹80K – ₹2L/yr"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Established Year</label>
                  <input name="established" type="number" value={form.established} onChange={handleFormChange} placeholder="2000"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Rating (1-5)</label>
                  <input name="rating" type="number" min="1" max="5" step="0.1" value={form.rating} onChange={handleFormChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Courses Offered</label>
                  <div className="flex flex-wrap gap-2">
                    {COURSES.map(c => (
                      <label key={c} className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" name="courses" value={c} checked={form.courses?.includes(c)} onChange={handleFormChange} className="text-blue-600" />
                        <span className="text-sm text-gray-700">{c}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Placement Highlights</label>
                  <textarea name="placementHighlights" value={form.placementHighlights} onChange={handleFormChange} rows={2}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Image URLs</label>
                  {(form.images || ['']).map((img, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input value={img} onChange={e => handleImageChange(i, e.target.value)} placeholder="https://..."
                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      {i === (form.images?.length || 1) - 1 && (
                        <button type="button" onClick={() => setForm(f => ({ ...f, images: [...(f.images || []), ''] }))}
                          className="px-3 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-sm hover:bg-blue-100">+</button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="col-span-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" name="featured" checked={form.featured} onChange={handleFormChange} className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Mark as Featured College</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm disabled:opacity-70">
                  {saving ? 'Saving...' : (editCollege ? 'Update College' : 'Add College')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
