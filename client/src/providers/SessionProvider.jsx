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

const userInfoPro = createContext();
const userInfoProUpdate = createContext();
export const useUserInfoPro = () => {
  return [useContext(userInfoPro), useContext(userInfoProUpdate)];
};

const UserCollectionsPro = createContext();
const UserCollectionsProUpdate = createContext();
export const useUserCollectionsPro = () => {
  return [useContext(UserCollectionsPro), useContext(UserCollectionsProUpdate)];
};

const user = JSON.parse(localStorage.getItem("user"));

export default function SessionProvider({ children }) {
  const [token, setToken] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [userInfo, setUserInfo] = useState(user);
  const [userCollections, setUserCollections] = useState();
  return (
    <tokenPro.Provider value={token}>
      <tokenProUpdate.Provider value={setToken}>
        <isMobilePro.Provider value={isMobile}>
          <isMobileProUpdate.Provider value={setIsMobile}>
            <userInfoPro.Provider value={userInfo}>
              <userInfoProUpdate.Provider value={setUserInfo}>
                <UserCollectionsPro.Provider value={userCollections}>
                  <UserCollectionsProUpdate.Provider value={setUserCollections}>
                    {children}
                  </UserCollectionsProUpdate.Provider>
                </UserCollectionsPro.Provider>
              </userInfoProUpdate.Provider>
            </userInfoPro.Provider>
          </isMobileProUpdate.Provider>
        </isMobilePro.Provider>
      </tokenProUpdate.Provider>
    </tokenPro.Provider>
  );
}
