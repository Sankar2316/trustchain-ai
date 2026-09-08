import { NavLink, useNavigate } from 'react-router-dom';
import { HiHome, HiDocumentText, HiLink, HiChartBar, HiAcademicCap, HiCog, HiLogout } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';

const navItems = [
  { path: '/', icon: HiHome, label: 'Dashboard' },
  { path: '/docmind', icon: HiDocumentText, label: 'DocMind' },
  { path: '/chainproof', icon: HiLink, label: 'ChainProof' },
  { path: '/predictiq', icon: HiChartBar, label: 'PredictIQ' },
  { path: '/certivault', icon: HiAcademicCap, label: 'CertiVault' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { account, chainId, connecting, connectWallet, disconnectWallet, shortAddress, getNetworkName } = useWallet();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">TC</div>
          <div>
            <h1 className="text-base font-bold">TrustChain AI</h1>
            <p className="text-xs text-gray-500">Enterprise Platform</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="mx-4 mb-3 p-3 bg-gray-800/50 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-200 truncate">{user?.email?.split('@')[0] || 'User'}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
          </div>
        </div>
      </div>

      {/* Wallet Connect */}
      <div className="mx-4 mb-4">
        {account ? (
          <div className="p-3 bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">Wallet Connected</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <p className="text-sm font-mono text-orange-400">{shortAddress(account)}</p>
            <p className="text-xs text-gray-500 mt-1">{getNetworkName(chainId)}</p>
            <button onClick={disconnectWallet} className="text-xs text-red-400 hover:text-red-300 mt-2 transition-colors">Disconnect</button>
          </div>
        ) : (
          <button onClick={connectWallet} disabled={connecting}
            className="w-full p-3 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50">
            {connecting ? (
              <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Connecting...</>
            ) : (
              <>🦊 Connect MetaMask</>
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider px-3 mb-2">Modules</p>
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink key={path} to={path}
            className={({ isActive }) =>
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all " +
              (isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-gray-400 hover:bg-gray-800 hover:text-white")
            }>
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 space-y-1">
        <div className="border-t border-gray-800 mb-2"></div>
        <NavLink to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
          <HiCog className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </NavLink>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
          <HiLogout className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
        <div className="px-3 pt-2">
          <p className="text-xs text-gray-700">v1.0.0 — Phase 1</p>
        </div>
      </div>
    </aside>
  );
}