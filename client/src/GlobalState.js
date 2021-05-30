import { createContext, useEffect, useState } from "react";
import axios from "axios";

import UserAPI from "./api/UserApi";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    const res = await axios.get("http://localhost:5000/user/refresh_token", {
      withCredentials: true,
    });

    setToken(res.data.accesstoken);
  };

  useEffect(() => {
    const tmpLogin = localStorage.getItem("tmpLogin");
    if (tmpLogin) refreshToken();
  }, []);

  const state = {
    token: [token, setToken],
    userApi: UserAPI(token),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
