// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

import axios from "axios";
import auth from "../Auth/firebase-init";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await axios.post("https://task-management-backend-ten-flame.vercel.app/users", {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logout,loading,setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
