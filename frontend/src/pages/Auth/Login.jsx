import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try { setError(''); setLoading(true); await login(email, password); navigate('/'); }
    catch (err) { setError('Login failed. Check email and password.'); }
    setLoading(false);
  }

  async function handleGoogle() {
    try { await loginWithGoogle(); navigate('/'); }
    catch (err) { setError('Google login failed.'); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">TC</div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 text-sm mt-1">Login to TrustChain AI</p>
        </div>
        {error && <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full mt-1 px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full mt-1 px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500" placeholder="Password" />
          </div>
          <button disabled={loading} type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50">{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        <div className="my-4 flex items-center gap-3"><div className="flex-1 h-px bg-gray-700"></div><span className="text-gray-500 text-sm">or</span><div className="flex-1 h-px bg-gray-700"></div></div>
        <button onClick={handleGoogle} className="w-full py-2.5 bg-white hover:bg-gray-100 text-gray-800 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">Continue with Google</button>
        <p className="text-center text-gray-400 text-sm mt-6">No account? <Link to="/register" className="text-blue-400 hover:text-blue-300">Register</Link></p>
      </div>
    </div>
  );
}