import { useState, useEffect } from 'react';
import API from '../utils/api';

const COURSES = ['B.Tech', 'MBA', 'MBBS', 'BCA', 'MCA', 'LLB', 'BBA', 'B.Sc', 'B.Pharm', 'BDS', 'B.Arch', 'B.Com', 'Other'];
const BUDGETS = ['Under ₹1 Lakh/yr', '₹1L – ₹2L/yr', '₹2L – ₹5L/yr', 'Above ₹5L/yr'];

export default function EnquiryModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', interestedCourse: '', collegeName: '', budgetRange: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handler = (e) => {
      setOpen(true);
      if (e.detail?.collegeName) setForm(f => ({ ...f, collegeName: e.detail.collegeName, collegeSlug: e.detail.slug || '' }));
    };
    window.addEventListener('open-enquiry', handler);
    return () => window.removeEventListener('open-enquiry', handler);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await API.post('/leads', form);
      setSuccess(true);
      setTimeout(() => { setOpen(false); setSuccess(false); setForm({ name: '', phone: '', email: '', interestedCourse: '', collegeName: '', budgetRange: '', message: '' }); }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-6 rounded-t-2xl">
          <button onClick={() => setOpen(false)} className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors text-lg">×</button>
          <h2 className="font-display text-2xl font-bold">Get Free Counselling</h2>
          <p className="text-blue-100 text-sm mt-1">Our expert will contact you within 24 hours</p>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Enquiry Submitted!</h3>
              <p className="text-gray-500 text-sm">Our counsellor will call you shortly. Thank you for choosing AdmitEase!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-xl">{error}</div>}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 9XXXXXXXXX"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Interested Course *</label>
                  <select name="interestedCourse" value={form.interestedCourse} onChange={handleChange} required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                    <option value="">Select course</option>
                    {COURSES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Budget Range</label>
                  <select name="budgetRange" value={form.budgetRange} onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                    <option value="">Select budget</option>
                    {BUDGETS.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Preferred College (optional)</label>
                  <input name="collegeName" value={form.collegeName} onChange={handleChange} placeholder="Name of college you're interested in"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Tell us about your goals, current qualification, etc."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
                </div>
              </div>

              <button type="submit" disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-200 text-sm">
                {submitting ? 'Submitting...' : 'Submit Enquiry →'}
              </button>
              <p className="text-center text-xs text-gray-400">🔒 Your information is 100% secure and never shared</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
