import { useState } from 'react';
import { HiPlusCircle, HiQrcode, HiBadgeCheck, HiCheckCircle, HiX, HiDownload } from 'react-icons/hi';

const demoCerts = [
  { id: 'CERT-001', recipient: 'Sankar S', course: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: '2026-07-15', status: 'Active' },
  { id: 'CERT-002', recipient: 'Priya K', course: 'React.js Advanced', issuer: 'Meta', date: '2026-08-01', status: 'Active' },
  { id: 'CERT-003', recipient: 'Ravi M', course: 'Python for AI', issuer: 'Google', date: '2026-06-20', status: 'Revoked' },
];

export default function CertiVault() {
  const [activeView, setActiveView] = useState(null);
  const [issueForm, setIssueForm] = useState({ recipient: '', course: '', issuer: '' });
  const [issued, setIssued] = useState(false);
  const [verifyId, setVerifyId] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [verifying, setVerifying] = useState(false);

  function handleIssue(e) {
    e.preventDefault();
    setIssued(true);
    setTimeout(() => { setIssued(false); setActiveView(null); setIssueForm({ recipient: '', course: '', issuer: '' }); }, 3000);
  }

  async function handleVerify() {
    setVerifying(true); setVerifyResult(null);
    await new Promise(r => setTimeout(r, 1500));
    const found = demoCerts.find(c => c.id === verifyId.toUpperCase()) || demoCerts[0];
    setVerifyResult({ ...found, blockchain: '0x8b2e...d4f1', ipfs: 'QmY9r...7kL2', verified: found.status === 'Active' });
    setVerifying(false);
  }

  const statusColors = { Active: 'bg-green-100 text-green-700', Revoked: 'bg-red-100 text-red-700' };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">CertiVault</h1>
        <p className="text-gray-500 text-sm mt-1">Blockchain Certificate Management — Issue, Verify, Revoke</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button onClick={() => { setActiveView('issue'); setIssued(false); }}
          className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl p-5 flex items-center gap-3 transition-colors">
          <HiPlusCircle className="w-6 h-6" />
          <div className="text-left"><p className="font-semibold">Issue Certificate</p><p className="text-xs opacity-80">Create & mint on blockchain</p></div>
        </button>
        <button onClick={() => { setActiveView('verify'); setVerifyResult(null); setVerifyId(''); }}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-5 flex items-center gap-3 transition-colors">
          <HiQrcode className="w-6 h-6" />
          <div className="text-left"><p className="font-semibold">Verify Certificate</p><p className="text-xs opacity-80">Scan QR or enter ID</p></div>
        </button>
        <button onClick={() => setActiveView('bulk')}
          className="bg-green-500 hover:bg-green-600 text-white rounded-xl p-5 flex items-center gap-3 transition-colors">
          <HiBadgeCheck className="w-6 h-6" />
          <div className="text-left"><p className="font-semibold">Bulk Issue</p><p className="text-xs opacity-80">Upload CSV for batch mint</p></div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Certificates List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">Issued Certificates</h2>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">{demoCerts.length} total</span>
          </div>
          <div className="space-y-3">
            {demoCerts.map((cert) => (
              <div key={cert.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => { setActiveView('verify'); setVerifyId(cert.id); setVerifyResult({...cert, blockchain: '0x8b2e...d4f1', ipfs: 'QmY9r...7kL2', verified: cert.status === 'Active'}); }}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{cert.recipient}</p>
                    <p className="text-xs text-gray-500">{cert.course}</p>
                    <p className="text-xs text-gray-400 mt-1">Issued by {cert.issuer} • {cert.date}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={"text-xs font-medium px-2 py-1 rounded-full " + (statusColors[cert.status] || '')}>{cert.status}</span>
                    <span className="text-xs text-gray-400 font-mono">{cert.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Dynamic Panel */}
        <div>
          {/* Issue Certificate */}
          {activeView === 'issue' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-800 mb-4">Issue New Certificate</h2>
              {issued ? (
                <div className="text-center py-8">
                  <HiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-green-700">Certificate Issued!</h3>
                  <p className="text-sm text-gray-500 mt-1">Minted on Polygon blockchain</p>
                  <p className="text-xs text-gray-400 mt-2 font-mono">Tx: 0x8b2e...d4f1a3c7</p>
                  <p className="text-xs text-gray-400 mt-1 font-mono">IPFS: QmY9rK...7kL2</p>
                  <div className="flex justify-center gap-3 mt-4">
                    <button className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm flex items-center gap-1"><HiDownload className="w-4 h-4" /> Download PDF</button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm flex items-center gap-1"><HiQrcode className="w-4 h-4" /> View QR</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleIssue} className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Recipient Name</label>
                    <input type="text" required value={issueForm.recipient} onChange={(e) => setIssueForm({...issueForm, recipient: e.target.value})}
                      className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500" placeholder="e.g., Sankar S" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Course / Certificate Name</label>
                    <input type="text" required value={issueForm.course} onChange={(e) => setIssueForm({...issueForm, course: e.target.value})}
                      className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500" placeholder="e.g., AWS Cloud Practitioner" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Issuer Organization</label>
                    <input type="text" required value={issueForm.issuer} onChange={(e) => setIssueForm({...issueForm, issuer: e.target.value})}
                      className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500" placeholder="e.g., Amazon Web Services" />
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors">Issue & Mint on Blockchain</button>
                </form>
              )}
            </div>
          )}

          {/* Verify Certificate */}
          {activeView === 'verify' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-800 mb-4">Verify Certificate</h2>
              <div className="flex gap-2 mb-4">
                <input type="text" value={verifyId} onChange={(e) => setVerifyId(e.target.value)}
                  placeholder="Enter Certificate ID (e.g., CERT-001)" className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
                <button onClick={handleVerify} disabled={verifying}
                  className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50">
                  {verifying ? '...' : 'Verify'}
                </button>
              </div>
              {verifyResult && (
                <div className={(verifyResult.verified ? "bg-green-50" : "bg-red-50") + " rounded-xl p-6"}>
                  <div className="text-center mb-4">
                    {verifyResult.verified ? <HiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" /> : <HiX className="w-12 h-12 text-red-500 mx-auto mb-2" />}
                    <h3 className={"text-lg font-bold " + (verifyResult.verified ? "text-green-700" : "text-red-700")}>{verifyResult.verified ? 'VALID CERTIFICATE' : 'REVOKED'}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-white rounded-lg"><span className="text-xs text-gray-400">Recipient</span><span className="text-sm font-medium">{verifyResult.recipient}</span></div>
                    <div className="flex justify-between p-2 bg-white rounded-lg"><span className="text-xs text-gray-400">Course</span><span className="text-sm font-medium">{verifyResult.course}</span></div>
                    <div className="flex justify-between p-2 bg-white rounded-lg"><span className="text-xs text-gray-400">Issuer</span><span className="text-sm font-medium">{verifyResult.issuer}</span></div>
                    <div className="flex justify-between p-2 bg-white rounded-lg"><span className="text-xs text-gray-400">Date</span><span className="text-sm font-medium">{verifyResult.date}</span></div>
                    <div className="flex justify-between p-2 bg-white rounded-lg"><span className="text-xs text-gray-400">Blockchain</span><span className="text-xs font-mono">{verifyResult.blockchain}</span></div>
                    <div className="flex justify-between p-2 bg-white rounded-lg"><span className="text-xs text-gray-400">IPFS</span><span className="text-xs font-mono">{verifyResult.ipfs}</span></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bulk Issue */}
          {activeView === 'bulk' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-800 mb-4">Bulk Issue Certificates</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                <HiBadgeCheck className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-600">Upload CSV File</p>
                <p className="text-xs text-gray-400 mt-1">Columns: recipient_name, course_name, issuer</p>
                <p className="text-xs text-gray-400">Each row = 1 certificate minted on blockchain</p>
              </div>
              <button className="w-full mt-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors">Upload & Batch Mint</button>
            </div>
          )}

          {!activeView && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <HiBadgeCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400">Select an action</h3>
              <p className="text-sm text-gray-300 mt-1">Issue, verify, or bulk mint certificates</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}