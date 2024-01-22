/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useLoginContext = () => useContext(UserContext);

export const UserLoginProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(null);
  useEffect(() => {
    async function getUser() {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/users/actual",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        setLoginUser(await response.json());
      }
    }
    getUser();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ loginUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

// We put the provider in the Protectors to know how is the user all the time, when they navigate
