import { createContext, useContext, useState } from 'react';

const WalletContext = createContext();
export function useWallet() { return useContext(WalletContext); }

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [connecting, setConnecting] = useState(false);

  async function connectWallet() {
    if (!window.ethereum) {
      alert('MetaMask not installed! Please install MetaMask extension.');
      window.open('https://metamask.io/download/', '_blank');
      return;
    }
    try {
      setConnecting(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chain = await window.ethereum.request({ method: 'eth_chainId' });
      setAccount(accounts[0]);
      setChainId(chain);

      window.ethereum.on('accountsChanged', (accs) => setAccount(accs[0] || null));
      window.ethereum.on('chainChanged', (id) => { setChainId(id); window.location.reload(); });
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
    setConnecting(false);
  }

  function disconnectWallet() {
    setAccount(null);
    setChainId(null);
  }

  function shortAddress(addr) {
    if (!addr) return '';
    return addr.slice(0, 6) + '...' + addr.slice(-4);
  }

  function getNetworkName(id) {
    const networks = { '0x1': 'Ethereum', '0x89': 'Polygon', '0x13882': 'Amoy Testnet', '0x5': 'Goerli', '0xaa36a7': 'Sepolia', '0x539': 'Localhost' };
    return networks[id] || 'Unknown Network';
  }

  return (
    <WalletContext.Provider value={{ account, chainId, connecting, connectWallet, disconnectWallet, shortAddress, getNetworkName }}>
      {children}
    </WalletContext.Provider>
  );
}