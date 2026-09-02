export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <p className="text-gray-500">TrustChain AI - Unified Enterprise Intelligence Platform</p>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <a href="/docmind" className="bg-white rounded-xl p-5 shadow border-l-4 border-blue-500 block hover:shadow-md">
          <h3 className="font-bold">DocMind</h3>
          <p className="text-sm text-gray-500">AI Document Intelligence</p>
        </a>
        <a href="/chainproof" className="bg-white rounded-xl p-5 shadow border-l-4 border-orange-500 block hover:shadow-md">
          <h3 className="font-bold">ChainProof</h3>
          <p className="text-sm text-gray-500">Blockchain Supply Chain</p>
        </a>
        <a href="/predictiq" className="bg-white rounded-xl p-5 shadow border-l-4 border-green-500 block hover:shadow-md">
          <h3 className="font-bold">PredictIQ</h3>
          <p className="text-sm text-gray-500">AI Analytics Engine</p>
        </a>
        <a href="/certivault" className="bg-white rounded-xl p-5 shadow border-l-4 border-purple-500 block hover:shadow-md">
          <h3 className="font-bold">CertiVault</h3>
          <p className="text-sm text-gray-500">Blockchain Certificates</p>
        </a>
      </div>
    </div>
  );
}