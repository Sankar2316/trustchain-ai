import { NavLink } from 'react-router-dom';
import { HiHome, HiDocumentText, HiLink, HiChartBar, HiAcademicCap, HiCog } from 'react-icons/hi';

const navItems = [
  { path: '/', icon: HiHome, label: 'Dashboard' },
  { path: '/docmind', icon: HiDocumentText, label: 'DocMind' },
  { path: '/chainproof', icon: HiLink, label: 'ChainProof' },
  { path: '/predictiq', icon: HiChartBar, label: 'PredictIQ' },
  { path: '/certivault', icon: HiAcademicCap, label: 'CertiVault' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 relative">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">TC</div>
        <h1 className="text-lg font-bold">TrustChain AI</h1>
      </div>
      <nav className="space-y-1">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink key={path} to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`
            }>
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <NavLink to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
          <HiCog className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}