import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-display font-bold text-xl text-white">Admit<span className="text-blue-400">Ease</span></span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Lucknow's trusted admission consulting platform. We help students find the right college and navigate the admission process with expert guidance.
            </p>
            <div className="mt-6 flex gap-4">
              <span className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors text-sm">f</span>
              <span className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors text-sm">in</span>
              <span className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors text-sm">yt</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/colleges" className="hover:text-blue-400 transition-colors">Explore Colleges</Link></li>
              <li><a href="#why-us" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><button onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry'))} className="hover:text-blue-400 transition-colors">Get Counselling</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Courses We Cover</h4>
            <ul className="space-y-2 text-sm">
              {['B.Tech', 'MBA', 'MBBS', 'BCA / MCA', 'LLB', 'B.Sc', 'BBA', 'B.Pharm'].map(c => (
                <li key={c}><Link to={`/colleges?course=${c}`} className="hover:text-blue-400 transition-colors">{c}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2024 AdmitEase. All rights reserved.</p>
          <p>Created by &#10084; YogeshDevX</p>
          <p className="mt-2 md:mt-0">Lucknow, Uttar Pradesh, India</p>
        </div>
      </div>
    </footer>
  );
}
