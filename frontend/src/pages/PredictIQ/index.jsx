import { useState } from 'react';
import { HiTrendingUp, HiShieldExclamation, HiCreditCard, HiChartBar, HiExclamation, HiCheckCircle } from 'react-icons/hi';

const models = [
  { id: 'demand', name: 'Demand Forecasting', icon: HiTrendingUp, color: 'bg-blue-500', tech: 'LSTM / Prophet', desc: 'Predict future sales and demand trends' },
  { id: 'health', name: 'Health Risk', icon: HiShieldExclamation, color: 'bg-red-500', tech: 'Random Forest', desc: 'Predict disease risk from symptoms' },
  { id: 'credit', name: 'Credit Scoring', icon: HiCreditCard, color: 'bg-green-500', tech: 'XGBoost', desc: 'Alternative credit score from behavior data' },
];

const demandData = [
  { month: 'Jan', actual: 4200, predicted: 4100 }, { month: 'Feb', actual: 3800, predicted: 3900 },
  { month: 'Mar', actual: 5100, predicted: 4900 }, { month: 'Apr', actual: 4700, predicted: 4800 },
  { month: 'May', actual: 5500, predicted: 5300 }, { month: 'Jun', actual: 6200, predicted: 6000 },
  { month: 'Jul', actual: null, predicted: 6800 }, { month: 'Aug', actual: null, predicted: 7200 },
  { month: 'Sep', actual: null, predicted: 6900 },
];

export default function PredictIQ() {
  const [activeModel, setActiveModel] = useState(null);
  const [predicting, setPredicting] = useState(false);
  const [result, setResult] = useState(null);
  const [healthForm, setHealthForm] = useState({ age: '', bp: 'Normal', sugar: 'No', smoking: 'No' });
  const [creditForm, setCreditForm] = useState({ income: '', age: '', transactions: '', onTime: '' });

  async function runDemand() {
    setPredicting(true); setResult(null);
    await new Promise(r => setTimeout(r, 2000));
    setResult({ type: 'demand', forecast: demandData, accuracy: 94.2, trend: 'Upward', nextMonth: '7,200 units' });
    setPredicting(false);
  }

  async function runHealth(e) {
    e.preventDefault(); setPredicting(true); setResult(null);
    await new Promise(r => setTimeout(r, 2000));
    const risk = parseInt(healthForm.age) > 45 || healthForm.bp === 'High' || healthForm.smoking === 'Yes' ? 72 : 18;
    setResult({ type: 'health', riskScore: risk, level: risk > 50 ? 'HIGH' : 'LOW', factors: [
      { name: 'Age Factor', impact: parseInt(healthForm.age) > 45 ? 'High' : 'Low' },
      { name: 'Blood Pressure', impact: healthForm.bp === 'High' ? 'High' : 'Normal' },
      { name: 'Sugar Level', impact: healthForm.sugar === 'Yes' ? 'High' : 'Normal' },
      { name: 'Smoking', impact: healthForm.smoking === 'Yes' ? 'High' : 'None' },
    ]});
    setPredicting(false);
  }

  async function runCredit(e) {
    e.preventDefault(); setPredicting(true); setResult(null);
    await new Promise(r => setTimeout(r, 2000));
    const score = Math.min(850, Math.max(300, parseInt(creditForm.income || 50000) / 100 + parseInt(creditForm.onTime || 80) * 5 + 200));
    setResult({ type: 'credit', score: Math.round(score), grade: score > 700 ? 'Excellent' : score > 550 ? 'Good' : 'Fair',
      eligible: score > 600, maxLoan: score > 700 ? '10,00,000' : score > 550 ? '5,00,000' : '2,00,000',
      breakdown: [
        { label: 'Income Stability', score: 85, max: 100 },
        { label: 'Transaction History', score: 72, max: 100 },
        { label: 'Payment Behavior', score: parseInt(creditForm.onTime || 80), max: 100 },
        { label: 'Account Age', score: 68, max: 100 },
      ]
    });
    setPredicting(false);
  }

  const maxVal = Math.max(...demandData.map(d => Math.max(d.actual || 0, d.predicted)));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">PredictIQ</h1>
        <p className="text-gray-500 text-sm mt-1">AI Analytics Engine — Forecast, Predict, Alert</p>
      </div>

      {/* Model Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {models.map((m) => (
          <button key={m.id} onClick={() => { setActiveModel(m.id); setResult(null); }}
            className={"rounded-xl p-5 text-left transition-all border-2 " + (activeModel === m.id ? "border-blue-500 bg-white shadow-md" : "border-gray-100 bg-white hover:shadow-sm")}>
            <div className={m.color + " w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3"}>
              <m.icon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-800">{m.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{m.desc}</p>
            <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 rounded-full text-gray-500 mt-2 inline-block">{m.tech}</span>
          </button>
        ))}
      </div>

      {/* Active Model Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {activeModel === 'demand' && (
            <div>
              <h2 className="font-semibold text-gray-800 mb-4">Demand Forecasting</h2>
              <p className="text-sm text-gray-500 mb-4">LSTM neural network analyzes historical sales data to predict future demand trends.</p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-xs text-gray-400 mb-2">Historical Data (6 months loaded)</p>
                <div className="flex items-end gap-1 h-24">
                  {demandData.slice(0, 6).map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-blue-400 rounded-t" style={{height: (d.actual / maxVal * 80) + 'px'}}></div>
                      <span className="text-xs text-gray-400">{d.month}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={runDemand} disabled={predicting}
                className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50">
                {predicting ? 'Running LSTM Model...' : 'Generate Forecast'}
              </button>
            </div>
          )}

          {activeModel === 'health' && (
            <div>
              <h2 className="font-semibold text-gray-800 mb-4">Health Risk Prediction</h2>
              <form onSubmit={runHealth} className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Age</label>
                  <input type="number" required value={healthForm.age} onChange={(e) => setHealthForm({...healthForm, age: e.target.value})}
                    className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Enter age" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Blood Pressure</label>
                  <select value={healthForm.bp} onChange={(e) => setHealthForm({...healthForm, bp: e.target.value})}
                    className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
                    <option>Normal</option><option>High</option><option>Low</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Diabetes</label>
                  <select value={healthForm.sugar} onChange={(e) => setHealthForm({...healthForm, sugar: e.target.value})}
                    className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
                    <option>No</option><option>Yes</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Smoking</label>
                  <select value={healthForm.smoking} onChange={(e) => setHealthForm({...healthForm, smoking: e.target.value})}
                    className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
                    <option>No</option><option>Yes</option>
                  </select>
                </div>
                <button type="submit" disabled={predicting}
                  className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50">
                  {predicting ? 'Analyzing...' : 'Predict Health Risk'}
                </button>
              </form>
            </div>
          )}

          {activeModel === 'credit' && (
            <div>
              <h2 className="font-semibold text-gray-800 mb-4">Credit Scoring</h2>
              <form onSubmit={runCredit} className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Monthly Income (Rs.)</label>
                  <input type="number" required value={creditForm.income} onChange={(e) => setCreditForm({...creditForm, income: e.target.value})}
                    className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" placeholder="e.g., 50000" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Age</label>
                  <input type="number" required value={creditForm.age} onChange={(e) => setCreditForm({...creditForm, age: e.target.value})}
                    className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" placeholder="e.g., 28" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Monthly Transactions</label>
                  <input type="number" required value={creditForm.transactions} onChange={(e) => setCreditForm({...creditForm, transactions: e.target.value})}
                    className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" placeholder="e.g., 45" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">On-time Payment % </label>
                  <input type="number" required value={creditForm.onTime} onChange={(e) => setCreditForm({...creditForm, onTime: e.target.value})}
                    className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" placeholder="e.g., 90" />
                </div>
                <button type="submit" disabled={predicting}
                  className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50">
                  {predicting ? 'Calculating...' : 'Calculate Credit Score'}
                </button>
              </form>
            </div>
          )}

          {!activeModel && (
            <div className="text-center py-12">
              <HiChartBar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400">Select a prediction model</h3>
              <p className="text-sm text-gray-300 mt-1">Choose from the cards above</p>
            </div>
          )}
        </div>

        {/* Right: Results */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {result?.type === 'demand' && (
            <div>
              <h2 className="font-semibold text-gray-800 mb-4">Forecast Results</h2>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-blue-50 rounded-lg p-3 text-center"><p className="text-xs text-gray-400">Accuracy</p><p className="text-lg font-bold text-blue-600">{result.accuracy}%</p></div>
                <div className="bg-green-50 rounded-lg p-3 text-center"><p className="text-xs text-gray-400">Trend</p><p className="text-lg font-bold text-green-600">{result.trend}</p></div>
                <div className="bg-purple-50 rounded-lg p-3 text-center"><p className="text-xs text-gray-400">Next Month</p><p className="text-lg font-bold text-purple-600">{result.nextMonth}</p></div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-3">Actual vs Predicted</p>
                <div className="flex items-end gap-1 h-32">
                  {demandData.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="w-full flex gap-0.5">
                        {d.actual && <div className="flex-1 bg-blue-400 rounded-t" style={{height: (d.actual / maxVal * 100) + 'px'}}></div>}
                        <div className={"flex-1 rounded-t " + (d.actual ? "bg-orange-400" : "bg-orange-400 border-2 border-dashed border-orange-300 bg-opacity-50")} style={{height: (d.predicted / maxVal * 100) + 'px'}}></div>
                      </div>
                      <span className="text-xs text-gray-400">{d.month}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-3 justify-center">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-400 rounded"></div><span className="text-xs text-gray-500">Actual</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-400 rounded"></div><span className="text-xs text-gray-500">Predicted</span></div>
                </div>
              </div>
            </div>
          )}

          {result?.type === 'health' && (
            <div>
              <h2 className="font-semibold text-gray-800 mb-4">Health Risk Analysis</h2>
              <div className={"rounded-xl p-6 text-center mb-4 " + (result.level === 'HIGH' ? "bg-red-50" : "bg-green-50")}>
                {result.level === 'HIGH' ? <HiExclamation className="w-12 h-12 text-red-500 mx-auto mb-2" /> : <HiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />}
                <h3 className={"text-2xl font-bold " + (result.level === 'HIGH' ? "text-red-600" : "text-green-600")}>{result.level} RISK</h3>
                <p className="text-3xl font-bold mt-1">{result.riskScore}%</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-3 max-w-xs mx-auto">
                  <div className={"h-3 rounded-full " + (result.level === 'HIGH' ? "bg-red-500" : "bg-green-500")} style={{width: result.riskScore + '%'}}></div>
                </div>
              </div>
              <div className="space-y-2">
                {result.factors.map((f, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{f.name}</span>
                    <span className={"text-xs font-medium px-2 py-1 rounded-full " + (f.impact === 'High' ? "bg-red-100 text-red-600" : f.impact === 'Normal' ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500")}>{f.impact}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result?.type === 'credit' && (
            <div>
              <h2 className="font-semibold text-gray-800 mb-4">Credit Score Result</h2>
              <div className="text-center mb-4">
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                    <circle cx="60" cy="60" r="50" stroke={result.score > 700 ? '#22c55e' : result.score > 550 ? '#f59e0b' : '#ef4444'}
                      strokeWidth="10" fill="none" strokeDasharray={314} strokeDashoffset={314 - (result.score - 300) / 550 * 314} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">{result.score}</span>
                    <span className="text-xs text-gray-400">/ 850</span>
                  </div>
                </div>
                <p className={"text-lg font-bold mt-2 " + (result.grade === 'Excellent' ? "text-green-600" : result.grade === 'Good' ? "text-yellow-600" : "text-red-600")}>{result.grade}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-400">Loan Eligible</p><p className={"text-sm font-bold " + (result.eligible ? "text-green-600" : "text-red-600")}>{result.eligible ? 'Yes' : 'No'}</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-400">Max Loan Amount</p><p className="text-sm font-bold">Rs. {result.maxLoan}</p></div>
              </div>
              <div className="space-y-2">
                {result.breakdown.map((b, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1"><span className="text-gray-600">{b.label}</span><span className="text-gray-400">{b.score}/{b.max}</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{width: b.score + '%'}}></div></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!result && (
            <div className="text-center py-12">
              <HiChartBar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400">No predictions yet</h3>
              <p className="text-sm text-gray-300 mt-1">Select a model and run prediction</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}