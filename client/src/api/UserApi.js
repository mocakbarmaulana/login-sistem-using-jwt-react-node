import { useState, useEffect } from "react";
import axios from "axios";

const UserApi = (token) => {
  const [isLogged, setIslogged] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          await axios.get("http://localhost:5000/user/infor", {
            headers: { authorization: token },
            withCredentials: true,
          });

          setIslogged(true);
        } catch (err) {
          console.log(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  return {
    isLogged: [isLogged, setIslogged],
  };
};

export default UserApi;
