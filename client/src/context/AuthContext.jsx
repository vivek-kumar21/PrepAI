import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../url";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  axios.defaults.withCredentials = true;

  const refreshToken = async () => {
    try {
      const res = await axios.get(`${URL}/api/users/refresh`, {
        withCredentials: true,
      });
      const data = res.data;
      setUser(data.message);
      setIsAuth(true);
      return data;
    } catch (error) {
      // console.error(
      //   "Error refreshing token:",
      //   error.response || error.message || error
      // );

      setIsAuth(false);
    }
  };

  const sendRequest = async () => {
    try {
      const res = await axios.get(`${URL}/api/users/user`, {
        withCredentials: true,
      });
      const data = res.data;
      setUser(data.message);
      setIsAuth(true);
    } catch (error) {
      // console.error(
      //   "Error fetching user:",
      //   error.response || error.message || error
      // );
      setIsAuth(false);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      sendRequest();
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      const interval = setInterval(() => {
        refreshToken();
      }, 1000 * 29);

      return () => clearInterval(interval);
    }
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
