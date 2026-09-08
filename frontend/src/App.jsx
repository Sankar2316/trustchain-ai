import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import DocMind from './pages/DocMind';
import ChainProof from './pages/ChainProof';
import PredictIQ from './pages/PredictIQ';
import CertiVault from './pages/CertiVault';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WalletProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/docmind" element={<DocMind />} />
              <Route path="/chainproof" element={<ChainProof />} />
              <Route path="/predictiq" element={<PredictIQ />} />
              <Route path="/certivault" element={<CertiVault />} />
            </Route>
          </Routes>
        </WalletProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;