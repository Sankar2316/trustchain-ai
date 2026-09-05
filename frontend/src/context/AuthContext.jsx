import { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) { return createUserWithEmailAndPassword(auth, email, password); }
  function login(email, password) { return signInWithEmailAndPassword(auth, email, password); }
  function loginWithGoogle() { return signInWithPopup(auth, googleProvider); }
  function logout() { return signOut(auth); }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => { setUser(user); setLoading(false); });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, login, loginWithGoogle, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}