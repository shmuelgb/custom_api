import React, { useContext, useState, createContext } from "react";

const tokenPro = createContext();
const tokenProUpdate = createContext();
export const useTokenPro = () => {
  return [useContext(tokenPro), useContext(tokenProUpdate)];
};

const isMobilePro = createContext();
const isMobileProUpdate = createContext();
export const useIsMobilePro = () => {
  return [useContext(isMobilePro), useContext(isMobileProUpdate)];
};

export default function SessionProvider({ children }) {
  const [token, setToken] = useState();
  const [isMobile, setIsMobile] = useState(false);
  return (
    <tokenPro.Provider value={token}>
      <tokenProUpdate.Provider value={setToken}>
        <isMobilePro.Provider value={isMobile}>
          <isMobileProUpdate.Provider value={setIsMobile}>
            {children}
          </isMobileProUpdate.Provider>
        </isMobilePro.Provider>
      </tokenProUpdate.Provider>
    </tokenPro.Provider>
  );
}
