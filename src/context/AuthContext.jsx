import React, { createContext, useState, useContext } from "react";

// 1) Create the context and define its shape
const AuthContext = createContext({
  userId: null,
  setUserId: () => {}
});

// 2) Provider component to wrap around your app
export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3) Convenience hook for consuming the context
export function useAuth() {
  return useContext(AuthContext);
}
