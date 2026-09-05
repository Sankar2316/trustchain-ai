import { useState } from 'react';
import { HiPlus, HiQrcode, HiMap, HiCheckCircle, HiClock, HiTruck, HiOfficeBuilding, HiShoppingCart } from 'react-icons/hi';

const demoProducts = [
  { id: 1, name: 'iPhone 15 Pro', manufacturer: 'Apple Inc.', date: '2026-08-15', status: 'Delivered', checkpoints: 4 },
  { id: 2, name: 'Paracetamol 500mg', manufacturer: 'Cipla Ltd', date: '2026-09-01', status: 'In Transit', checkpoints: 2 },
  { id: 3, name: 'Organic Rice 5kg', manufacturer: 'Nature Fresh', date: '2026-09-03', status: 'At Warehouse', checkpoints: 3 },
];

const demoTimeline = [
  { location: 'Factory — Shenzhen, China', handler: 'Apple Manufacturing', status: 'Manufactured', time: '2026-08-15 09:00', icon: HiOfficeBuilding, color: 'bg-blue-500' },
  { location: 'Port — Shanghai, China', handler: 'DHL Logistics', status: 'Shipped', time: '2026-08-18 14:30', icon: HiTruck, color: 'bg-orange-500' },
  { location: 'Customs — Mumbai, India', handler: 'Indian Customs', status: 'Cleared', time: '2026-08-25 11:00', icon: HiCheckCircle, color: 'bg-green-500' },
  { location: 'Store — Chennai, India', handler: 'iStore Chennai', status: 'Delivered', time: '2026-08-28 16:45', icon: HiShoppingCart, color: 'bg-purple-500' },
];

export default function ChainProof() {
  const [activeView, setActiveView] = useState('products');
  const [showRegister, setShowRegister] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null);
  const [formData, setFormData] = useState({ name: '', manufacturer: '', description: '' });
  const [registered, setRegistered] = useState(false);

  function handleRegister(e) {
    e.preventDefault();
    setRegistered(true);
    setTimeout(() => { setRegistered(false); setShowRegister(false); setFormData({ name: '', manufacturer: '', description: '' }); }, 2000);
  }

  function handleVerify() {
    setVerifyResult(null);
    setTimeout(() => {
      setVerifyResult({ authentic: true, product: 'iPhone 15 Pro', manufacturer: 'Apple Inc.', checkpoints: 4, lastLocation: 'iStore Chennai', blockchain: '0x7a3b...f9e2', ipfs: 'QmX7k...3pR9' });
    }, 1500);
  }

  const statusColors = { 'Delivered': 'bg-green-100 text-green-700', 'In Transit': 'bg-yellow-100 text-yellow-700', 'At Warehouse': 'bg-blue-100 text-blue-700' };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">ChainProof</h1>
        <p className="text-gray-500 text-sm mt-1">Blockchain Supply Chain Transparency — Track, Verify, Trust</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button onClick={() => { setShowRegister(true); setShowTimeline(false); setShowVerify(false); }}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl p-5 flex items-center gap-3 transition-colors">
          <HiPlus className="w-6 h-6" />
          <div className="text-left"><p className="font-semibold">Register Product</p><p className="text-xs opacity-80">Add to blockchain</p></div>
        </button>
        <button onClick={() => { setShowVerify(true); setShowRegister(false); setShowTimeline(false); setVerifyResult(null); }}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-5 flex items-center gap-3 transition-colors">
          <HiQrcode className="w-6 h-6" />
          <div className="text-left"><p className="font-semibold">Verify Product</p><p className="text-xs opacity-80">Scan QR / Enter ID</p></div>
        </button>
        <button onClick={() => { setShowTimeline(true); setShowRegister(false); setShowVerify(false); }}
          className="bg-green-500 hover:bg-green-600 text-white rounded-xl p-5 flex items-center gap-3 transition-colors">
          <HiMap className="w-6 h-6" />
          <div className="text-left"><p className="font-semibold">Track Journey</p><p className="text-xs opacity-80">View supply chain</p></div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Registered Products</h2>
          <div className="space-y-3">
            {demoProducts.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => { setShowTimeline(true); setShowRegister(false); setShowVerify(false); }}>
                <div>
                  <p className="text-sm font-medium text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.manufacturer} • {p.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={"text-xs font-medium px-2 py-1 rounded-full " + (statusColors[p.status] || '')}>{p.status}</span>
                  <span className="text-xs text-gray-400">{p.checkpoints} stops</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Dynamic Panel */}
        <div>
          {/* Register Form */}
          {showRegister && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-800 mb-4">Register New Product</h2>
              {registered ? (
                <div className="text-center py-8">
                  <HiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-green-700">Product Registered!</h3>
                  <p className="text-sm text-gray-500 mt-1">Minted on Polygon blockchain</p>
                  <p className="text-xs text-gray-400 mt-2 font-mono">Tx: 0x7a3b...f9e2c1d8</p>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Product Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" placeholder="e.g., iPhone 15 Pro" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Manufacturer</label>
                    <input type="text" required value={formData.manufacturer} onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                      className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" placeholder="e.g., Apple Inc." />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Description</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" rows="3" placeholder="Product details..." />
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">Register on Blockchain</button>
                </form>
              )}
            </div>
          )}

          {/* Supply Chain Timeline */}
          {showTimeline && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-800 mb-4">Supply Chain Journey — iPhone 15 Pro</h2>
              <div className="space-y-0">
                {demoTimeline.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={step.color + " w-10 h-10 rounded-full flex items-center justify-center text-white"}>
                        <step.icon className="w-5 h-5" />
                      </div>
                      {i < demoTimeline.length - 1 && <div className="w-0.5 h-16 bg-gray-200"></div>}
                    </div>
                    <div className="pb-8">
                      <p className="text-sm font-semibold text-gray-800">{step.status}</p>
                      <p className="text-sm text-gray-600">{step.location}</p>
                      <p className="text-xs text-gray-400">{step.handler} • {step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-400">Blockchain: <span className="font-mono">0x7a3b...f9e2c1d8</span></p>
                <p className="text-xs text-gray-400">IPFS: <span className="font-mono">QmX7kR...3pR9</span></p>
              </div>
            </div>
          )}

          {/* Verify Product */}
          {showVerify && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-800 mb-4">Verify Product Authenticity</h2>
              <div className="flex gap-2 mb-4">
                <input type="text" placeholder="Enter Product ID or scan QR code" className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
                <button onClick={handleVerify} className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">Verify</button>
              </div>
              {verifyResult && (
                <div className="bg-green-50 rounded-xl p-6 text-center">
                  <HiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <h3 className="text-lg font-bold text-green-700">AUTHENTIC</h3>
                  <p className="text-sm text-gray-600 mt-2">{verifyResult.product} by {verifyResult.manufacturer}</p>
                  <div className="grid grid-cols-2 gap-3 mt-4 text-left">
                    <div className="bg-white rounded-lg p-3"><p className="text-xs text-gray-400">Checkpoints</p><p className="text-sm font-bold">{verifyResult.checkpoints}</p></div>
                    <div className="bg-white rounded-lg p-3"><p className="text-xs text-gray-400">Last Location</p><p className="text-sm font-bold">{verifyResult.lastLocation}</p></div>
                    <div className="bg-white rounded-lg p-3"><p className="text-xs text-gray-400">Blockchain</p><p className="text-xs font-mono">{verifyResult.blockchain}</p></div>
                    <div className="bg-white rounded-lg p-3"><p className="text-xs text-gray-400">IPFS</p><p className="text-xs font-mono">{verifyResult.ipfs}</p></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Default */}
          {!showRegister && !showTimeline && !showVerify && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <HiQrcode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400">Select an action</h3>
              <p className="text-sm text-gray-300 mt-1">Register, verify, or track products</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}