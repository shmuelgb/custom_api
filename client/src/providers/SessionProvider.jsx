import React, { useContext, useState, createContext } from "react";

const tokenPro = createContext();
const tokenProUpdate = createContext();
export const useTokenPro = () => {
  return [useContext(tokenPro), useContext(tokenProUpdate)];
};

export default function SessionProvider({ children }) {
  const [token, setToken] = useState();
  return (
    <tokenPro.Provider value={token}>
      <tokenProUpdate.Provider value={setToken}>
        {children}
      </tokenProUpdate.Provider>
    </tokenPro.Provider>
  );
}
