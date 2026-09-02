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