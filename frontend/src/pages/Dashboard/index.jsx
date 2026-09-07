import { useAuth } from '../../context/AuthContext';
import { HiDocumentText, HiLink, HiChartBar, HiAcademicCap, HiArrowRight, HiClock, HiLogout, HiMoon, HiSun } from 'react-icons/hi';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';

const stats = [
  { label: 'Documents Processed', value: '247', change: '+12%', icon: HiDocumentText, gradient: 'from-blue-500 to-blue-600' },
  { label: 'Products Tracked', value: '89', change: '+8%', icon: HiLink, gradient: 'from-orange-500 to-orange-600' },
  { label: 'Predictions Made', value: '1,204', change: '+23%', icon: HiChartBar, gradient: 'from-green-500 to-green-600' },
  { label: 'Certificates Issued', value: '156', change: '+5%', icon: HiAcademicCap, gradient: 'from-purple-500 to-purple-600' },
];

const monthlyData = [
  { month: 'Jan', documents: 120, products: 45, predictions: 320, certificates: 67 },
  { month: 'Feb', documents: 98, products: 52, predictions: 410, certificates: 45 },
  { month: 'Mar', documents: 186, products: 61, predictions: 520, certificates: 89 },
  { month: 'Apr', documents: 145, products: 48, predictions: 480, certificates: 72 },
  { month: 'May', documents: 210, products: 72, predictions: 680, certificates: 110 },
  { month: 'Jun', documents: 175, products: 65, predictions: 590, certificates: 95 },
  { month: 'Jul', documents: 230, products: 78, predictions: 820, certificates: 130 },
  { month: 'Aug', documents: 247, products: 89, predictions: 1204, certificates: 156 },
];

const pieData = [
  { name: 'DocMind', value: 35, color: '#3B82F6' },
  { name: 'ChainProof', value: 20, color: '#F97316' },
  { name: 'PredictIQ', value: 30, color: '#22C55E' },
  { name: 'CertiVault', value: 15, color: '#A855F7' },
];

const fraudData = [
  { month: 'Jan', genuine: 95, fraud: 5 },
  { month: 'Feb', genuine: 88, fraud: 12 },
  { month: 'Mar', genuine: 92, fraud: 8 },
  { month: 'Apr', genuine: 97, fraud: 3 },
  { month: 'May', genuine: 90, fraud: 10 },
  { month: 'Jun', genuine: 94, fraud: 6 },
  { month: 'Jul', genuine: 91, fraud: 9 },
  { month: 'Aug', genuine: 96, fraud: 4 },
];

const modules = [
  { name: 'DocMind', desc: 'AI Document Intelligence — OCR, NLP, Fraud Detection', path: '/docmind', gradient: 'from-blue-500 to-indigo-600', icon: '📄', tag: 'AI/ML' },
  { name: 'ChainProof', desc: 'Blockchain Supply Chain — Track, Verify, Trust', path: '/chainproof', gradient: 'from-orange-500 to-red-500', icon: '🔗', tag: 'Blockchain' },
  { name: 'PredictIQ', desc: 'AI Analytics — Forecasting, Risk, Credit Scoring', path: '/predictiq', gradient: 'from-green-500 to-emerald-600', icon: '🧠', tag: 'AI/ML' },
  { name: 'CertiVault', desc: 'Blockchain Certificates — Issue, Verify, Revoke', path: '/certivault', gradient: 'from-purple-500 to-violet-600', icon: '🎓', tag: 'Blockchain' },
];

const recentActivity = [
  { action: 'Document analyzed', detail: 'Invoice #INV-2024-0847 — GENUINE (88%)', time: '2 min ago', color: 'bg-blue-500' },
  { action: 'Product verified', detail: 'iPhone 15 Pro — AUTHENTIC via Polygon', time: '15 min ago', color: 'bg-orange-500' },
  { action: 'Demand forecast', detail: 'Q4 2026: 7,200 units (94.2% accuracy)', time: '1 hr ago', color: 'bg-green-500' },
  { action: 'Certificate minted', detail: 'AWS Cloud Practitioner — Sankar S', time: '3 hrs ago', color: 'bg-purple-500' },
  { action: 'Credit score calculated', detail: 'Score: 742 — Excellent — Loan eligible', time: '5 hrs ago', color: 'bg-emerald-500' },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [chartTab, setChartTab] = useState('overview');

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.email?.split('@')[0] || 'User'} 👋</h1>
          <p className="text-gray-500 text-sm mt-1">TrustChain AI — Unified Enterprise Intelligence Platform</p>
        </div>
        <button onClick={logout} className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-sm text-red-600 transition-colors">
          <HiLogout className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, value, change, icon: Icon, gradient }) => (
          <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-2xl font-bold mt-1 text-gray-800">{value}</p>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-2 inline-block">{change}</span>
              </div>
              <div className={"bg-gradient-to-br " + gradient + " p-2.5 rounded-xl"}>
                <Icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">Platform Analytics</h2>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              {['overview', 'fraud'].map(tab => (
                <button key={tab} onClick={() => setChartTab(tab)}
                  className={"px-3 py-1 rounded-md text-xs font-medium transition-colors " + (chartTab === tab ? "bg-white shadow text-gray-800" : "text-gray-500")}>
                  {tab === 'overview' ? 'Overview' : 'Fraud Analysis'}
                </button>
              ))}
            </div>
          </div>
          {chartTab === 'overview' ? (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{fontSize: 12}} stroke="#9ca3af" />
                <YAxis tick={{fontSize: 12}} stroke="#9ca3af" />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Legend />
                <Area type="monotone" dataKey="documents" name="Documents" stroke="#3B82F6" fill="url(#colorDocs)" strokeWidth={2} />
                <Area type="monotone" dataKey="predictions" name="Predictions" stroke="#22C55E" fill="url(#colorPred)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={fraudData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{fontSize: 12}} stroke="#9ca3af" />
                <YAxis tick={{fontSize: 12}} stroke="#9ca3af" />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Legend />
                <Bar dataKey="genuine" name="Genuine" fill="#22C55E" radius={[4,4,0,0]} />
                <Bar dataKey="fraud" name="Fraud" fill="#EF4444" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-4">Module Usage</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{background: item.color}}></div>
                <span className="text-xs text-gray-600">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modules + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Modules */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Core Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map(({ name, desc, path, gradient, icon, tag }) => (
              <a key={name} href={path} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all block">
                <div className={"bg-gradient-to-r " + gradient + " p-4 flex justify-between items-center"}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <h3 className="font-bold text-white">{name}</h3>
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full text-white">{tag}</span>
                    </div>
                  </div>
                  <HiArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={item.color + " w-2 h-2 rounded-full mt-1.5 flex-shrink-0"}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800">{item.action}</p>
                    <p className="text-xs text-gray-500 truncate">{item.detail}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}