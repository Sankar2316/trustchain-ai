import { useState } from 'react';
import { HiUpload, HiDocumentText, HiSearchCircle, HiShieldExclamation, HiX, HiCheckCircle } from 'react-icons/hi';

export default function DocMind() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('extract');

  function handleFileChange(e) {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setResult(null);
      if (selected.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (ev) => setPreview(ev.target.result);
        reader.readAsDataURL(selected);
      } else {
        setPreview(null);
      }
    }
  }

  async function handleUpload() {
    if (!file) return;
    setProcessing(true);
    // Simulate AI processing (replace with real API call later)
    await new Promise(r => setTimeout(r, 2500));
    setResult({
      text: "Invoice #INV-2024-0847\nDate: 15/08/2026\nVendor: ABC Technologies Pvt Ltd\nGST: 27AABCU9603R1ZP\nItem: Cloud Server Hosting (12 months)\nAmount: Rs. 1,24,500.00\nTax (18% GST): Rs. 22,410.00\nTotal: Rs. 1,46,910.00\nPayment Due: 30/09/2026\nBank: HDFC Bank, Acc: 50200012345678",
      entities: [
        { label: 'Invoice Number', value: 'INV-2024-0847', type: 'ID' },
        { label: 'Date', value: '15/08/2026', type: 'DATE' },
        { label: 'Vendor', value: 'ABC Technologies Pvt Ltd', type: 'ORG' },
        { label: 'GST Number', value: '27AABCU9603R1ZP', type: 'ID' },
        { label: 'Item', value: 'Cloud Server Hosting (12 months)', type: 'ITEM' },
        { label: 'Amount', value: 'Rs. 1,24,500.00', type: 'MONEY' },
        { label: 'Tax', value: 'Rs. 22,410.00 (18% GST)', type: 'MONEY' },
        { label: 'Total', value: 'Rs. 1,46,910.00', type: 'MONEY' },
        { label: 'Due Date', value: '30/09/2026', type: 'DATE' },
        { label: 'Bank Account', value: 'HDFC Bank - 50200012345678', type: 'ACCOUNT' },
      ],
      fraud: { score: 0.12, status: 'GENUINE', confidence: 88, reasons: ['Valid GST format', 'Consistent vendor history', 'Amount within normal range', 'No duplicate invoice detected'] }
    });
    setProcessing(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
      setResult(null);
      if (dropped.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (ev) => setPreview(ev.target.result);
        reader.readAsDataURL(dropped);
      }
    }
  }

  const typeColors = { ID: 'bg-blue-100 text-blue-700', DATE: 'bg-purple-100 text-purple-700', ORG: 'bg-green-100 text-green-700', MONEY: 'bg-yellow-100 text-yellow-700', ITEM: 'bg-orange-100 text-orange-700', ACCOUNT: 'bg-red-100 text-red-700' };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">DocMind</h1>
        <p className="text-gray-500 text-sm mt-1">AI-Powered Document Intelligence — OCR + NLP + Fraud Detection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Upload */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
            <h2 className="font-semibold text-gray-800 mb-4">Upload Document</h2>
            <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer block">
              <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg,.tiff" onChange={handleFileChange} />
              {preview ? (
                <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg mb-3" />
              ) : (
                <HiUpload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              )}
              {file ? (
                <div>
                  <p className="text-sm font-medium text-gray-700">{file.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium text-gray-600">Drop file here or click to upload</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG, TIFF (Max 10MB)</p>
                </div>
              )}
            </label>
            {file && (
              <button onClick={handleUpload} disabled={processing}
                className="w-full mt-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {processing ? (
                  <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Processing with AI...</>
                ) : 'Analyze Document'}
              </button>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <HiDocumentText className="w-6 h-6 text-blue-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700">OCR</p>
              <p className="text-xs text-gray-400">Textract</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <HiSearchCircle className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700">NLP</p>
              <p className="text-xs text-gray-400">spaCy</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <HiShieldExclamation className="w-6 h-6 text-red-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700">Fraud</p>
              <p className="text-xs text-gray-400">ML Model</p>
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div>
          {result ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              {/* Tabs */}
              <div className="flex border-b border-gray-100">
                {[
                  { id: 'extract', label: 'Extracted Text', icon: HiDocumentText },
                  { id: 'entities', label: 'Entities', icon: HiSearchCircle },
                  { id: 'fraud', label: 'Fraud Check', icon: HiShieldExclamation },
                ].map(({ id, label, icon: Icon }) => (
                  <button key={id} onClick={() => setActiveTab(id)}
                    className={"flex-1 py-3 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors " + (activeTab === id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400 hover:text-gray-600")}>
                    <Icon className="w-4 h-4" /> {label}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {/* Extracted Text Tab */}
                {activeTab === 'extract' && (
                  <div>
                    <pre className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">{result.text}</pre>
                  </div>
                )}

                {/* Entities Tab */}
                {activeTab === 'entities' && (
                  <div className="space-y-2">
                    {result.entities.map((e, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-xs text-gray-400">{e.label}</p>
                          <p className="text-sm font-medium text-gray-800">{e.value}</p>
                        </div>
                        <span className={"text-xs font-medium px-2 py-1 rounded-full " + (typeColors[e.type] || "bg-gray-100 text-gray-600")}>{e.type}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Fraud Check Tab */}
                {activeTab === 'fraud' && (
                  <div>
                    <div className={"rounded-xl p-6 text-center mb-4 " + (result.fraud.status === 'GENUINE' ? "bg-green-50" : "bg-red-50")}>
                      {result.fraud.status === 'GENUINE' ? (
                        <HiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                      ) : (
                        <HiX className="w-12 h-12 text-red-500 mx-auto mb-2" />
                      )}
                      <h3 className={"text-xl font-bold " + (result.fraud.status === 'GENUINE' ? "text-green-700" : "text-red-700")}>{result.fraud.status}</h3>
                      <p className="text-sm text-gray-500 mt-1">Confidence: {result.fraud.confidence}%</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3 max-w-xs mx-auto">
                        <div className={"h-2 rounded-full " + (result.fraud.status === 'GENUINE' ? "bg-green-500" : "bg-red-500")} style={{width: result.fraud.confidence + '%'}}></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Analysis Details</h4>
                      {result.fraud.reasons.map((r, i) => (
                        <div key={i} className="flex items-center gap-2 py-1.5">
                          <HiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <HiDocumentText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400">No document analyzed yet</h3>
              <p className="text-sm text-gray-300 mt-1">Upload a document to see AI-powered results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}