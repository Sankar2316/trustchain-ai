const fs = require('fs');
const path = require('path');

function w(filePath, content) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content.trim() + '\n');
  console.log('Created: ' + filePath);
}

// ========== VITE CONFIG ==========
w('frontend/vite.config.js', `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'http://localhost:5000', changeOrigin: true }
    }
  }
})
`);

// ========== INDEX CSS ==========
w('frontend/src/index.css', `@import "tailwindcss";`);

// ========== APP.JSX ==========
w('frontend/src/App.jsx', `
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import DocMind from './pages/DocMind';
import ChainProof from './pages/ChainProof';
import PredictIQ from './pages/PredictIQ';
import CertiVault from './pages/CertiVault';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/docmind" element={<DocMind />} />
          <Route path="/chainproof" element={<ChainProof />} />
          <Route path="/predictiq" element={<PredictIQ />} />
          <Route path="/certivault" element={<CertiVault />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
`);

// ========== SIDEBAR ==========
w('frontend/src/components/layout/Sidebar.jsx', `
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
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors " +
              (isActive ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white")
            }>
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <NavLink to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
          <HiCog className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
`);

// ========== LAYOUT ==========
w('frontend/src/components/layout/Layout.jsx', `
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
`);

// ========== DASHBOARD ==========
w('frontend/src/pages/Dashboard/index.jsx', `
import { HiDocumentText, HiLink, HiChartBar, HiAcademicCap } from 'react-icons/hi';

const stats = [
  { label: 'Documents Processed', value: '0', icon: HiDocumentText, color: 'bg-blue-500' },
  { label: 'Products Tracked', value: '0', icon: HiLink, color: 'bg-orange-500' },
  { label: 'Predictions Made', value: '0', icon: HiChartBar, color: 'bg-green-500' },
  { label: 'Certificates Issued', value: '0', icon: HiAcademicCap, color: 'bg-purple-500' },
];

const modules = [
  { name: 'DocMind', desc: 'AI Document Intelligence - OCR, NLP, Fraud Detection', path: '/docmind', color: 'border-blue-500', tag: 'AI/ML' },
  { name: 'ChainProof', desc: 'Blockchain Supply Chain Transparency', path: '/chainproof', color: 'border-orange-500', tag: 'Blockchain' },
  { name: 'PredictIQ', desc: 'AI Analytics - Forecasting, Risk, Anomaly Detection', path: '/predictiq', color: 'border-green-500', tag: 'AI/ML' },
  { name: 'CertiVault', desc: 'Blockchain Certificates - Issue, Verify, Revoke', path: '/certivault', color: 'border-purple-500', tag: 'Blockchain' },
];

export default function Dashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">TrustChain AI - Unified Enterprise Intelligence Platform</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-3xl font-bold mt-1 text-gray-800">{value}</p>
              </div>
              <div className={color + " p-2 rounded-lg"}>
                <Icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Core Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map(({ name, desc, path, color, tag }) => (
          <a key={name} href={path}
            className={"bg-white rounded-xl p-5 shadow-sm border-l-4 " + color + " hover:shadow-md transition-shadow cursor-pointer block"}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-800">{name}</h3>
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600">{tag}</span>
            </div>
            <p className="text-sm text-gray-500">{desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
`);

// ========== DOCMIND ==========
w('frontend/src/pages/DocMind/index.jsx', `
import { HiUpload, HiDocumentText, HiSearchCircle } from 'react-icons/hi';

export default function DocMind() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">DocMind</h1>
        <p className="text-gray-500 text-sm mt-1">AI-Powered Document Intelligence</p>
      </div>
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer">
          <HiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Document</h3>
          <p className="text-sm text-gray-500 mb-4">Drag and drop invoices, bills, prescriptions, certificates</p>
          <p className="text-xs text-gray-400">Supports PDF, PNG, JPG, TIFF (Max 10MB)</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <HiDocumentText className="w-8 h-8 text-blue-500 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-1">OCR Extraction</h3>
          <p className="text-sm text-gray-500">AWS Textract powered text extraction</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <HiSearchCircle className="w-8 h-8 text-green-500 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-1">NLP Entity Extraction</h3>
          <p className="text-sm text-gray-500">Smart extraction using spaCy</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <HiDocumentText className="w-8 h-8 text-red-500 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-1">Fraud Detection</h3>
          <p className="text-sm text-gray-500">ML-powered fraud scoring</p>
        </div>
      </div>
    </div>
  );
}
`);

// ========== CHAINPROOF ==========
w('frontend/src/pages/ChainProof/index.jsx', `
import { HiPlus, HiQrcode, HiMap } from 'react-icons/hi';

export default function ChainProof() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">ChainProof</h1>
        <p className="text-gray-500 text-sm mt-1">Blockchain Supply Chain Transparency</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl p-5 flex items-center gap-3 transition-colors">
          <HiPlus className="w-6 h-6" />
          <div className="text-left">
            <p className="font-semibold">Register Product</p>
            <p className="text-xs opacity-80">Add new product to blockchain</p>
          </div>
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-5 flex items-center gap-3 transition-colors">
          <HiQrcode className="w-6 h-6" />
          <div className="text-left">
            <p className="font-semibold">Scan QR Code</p>
            <p className="text-xs opacity-80">Verify product authenticity</p>
          </div>
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white rounded-xl p-5 flex items-center gap-3 transition-colors">
          <HiMap className="w-6 h-6" />
          <div className="text-left">
            <p className="font-semibold">Track Journey</p>
            <p className="text-xs opacity-80">View supply chain timeline</p>
          </div>
        </button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-4">Registered Products</h2>
        <div className="text-center py-12 text-gray-400">
          <p>No products registered yet</p>
        </div>
      </div>
    </div>
  );
}
`);

// ========== PREDICTIQ ==========
w('frontend/src/pages/PredictIQ/index.jsx', `
import { HiTrendingUp, HiShieldExclamation, HiCreditCard } from 'react-icons/hi';

export default function PredictIQ() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">PredictIQ</h1>
        <p className="text-gray-500 text-sm mt-1">AI Analytics and Prediction Engine</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <HiTrendingUp className="w-8 h-8 text-blue-500 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-1">Demand Forecasting</h3>
          <p className="text-sm text-gray-500">LSTM-based time series prediction</p>
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">LSTM</span>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <HiShieldExclamation className="w-8 h-8 text-red-500 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-1">Health Risk Prediction</h3>
          <p className="text-sm text-gray-500">Predict disease risk from symptoms</p>
          <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full font-medium">Random Forest</span>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <HiCreditCard className="w-8 h-8 text-green-500 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-1">Credit Scoring</h3>
          <p className="text-sm text-gray-500">Alternative credit scoring</p>
          <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full font-medium">XGBoost</span>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-4">Analytics Dashboard</h2>
        <div className="text-center py-12 text-gray-400">
          <p>Upload data to start generating predictions</p>
        </div>
      </div>
    </div>
  );
}
`);

// ========== CERTIVAULT ==========
w('frontend/src/pages/CertiVault/index.jsx', `
import { HiPlusCircle, HiQrcode, HiBadgeCheck } from 'react-icons/hi';

export default function CertiVault() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">CertiVault</h1>
        <p className="text-gray-500 text-sm mt-1">Blockchain Certificate Management</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl p-5 flex items-center gap-3 transition-colors">
          <HiPlusCircle className="w-6 h-6" />
          <div className="text-left">
            <p className="font-semibold">Issue Certificate</p>
            <p className="text-xs opacity-80">Create and mint on blockchain</p>
          </div>
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-5 flex items-center gap-3 transition-colors">
          <HiQrcode className="w-6 h-6" />
          <div className="text-left">
            <p className="font-semibold">Verify Certificate</p>
            <p className="text-xs opacity-80">Scan QR or enter ID</p>
          </div>
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white rounded-xl p-5 flex items-center gap-3 transition-colors">
          <HiBadgeCheck className="w-6 h-6" />
          <div className="text-left">
            <p className="font-semibold">Bulk Issue</p>
            <p className="text-xs opacity-80">Upload CSV for batch minting</p>
          </div>
        </button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-4">Issued Certificates</h2>
        <div className="text-center py-12 text-gray-400">
          <p>No certificates issued yet</p>
        </div>
      </div>
    </div>
  );
}
`);

// ========== API SERVICE ==========
w('frontend/src/services/api.js', `
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});

export const getDashboardStats = () => api.get('/dashboard/stats');
export const uploadDocument = (formData) => api.post('/docmind/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getDocuments = () => api.get('/docmind/documents');
export const registerProduct = (data) => api.post('/chainproof/register', data);
export const verifyProduct = (id) => api.get('/chainproof/verify/' + id);
export const getForecast = (data) => api.post('/predictiq/forecast', data);
export const issueCertificate = (data) => api.post('/certivault/issue', data);
export const verifyCertificate = (id) => api.get('/certivault/verify/' + id);

export default api;
`);

console.log('');
console.log('=============================================');
console.log('  ALL 11 FRONTEND FILES CREATED SUCCESSFULLY!');
console.log('=============================================');
console.log('');
console.log('Now run:');
console.log('  cd frontend');
console.log('  npm run dev');
console.log('');
