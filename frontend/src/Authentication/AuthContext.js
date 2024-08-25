import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
const API_URL = "http://127.0.0.1:8000";

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    try {
      const tokens = localStorage.getItem("authTokens");
      return tokens ? JSON.parse(tokens) : null;
    } catch (error) {
      console.error("Failed to parse auth tokens : ", error);
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const tokens = localStorage.getItem("authTokens");
      return tokens ? jwtDecode(JSON.parse(tokens).access) : null;
    } catch (error) {
      console.error("Failed to parse auth tokens for user : ", error);
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/login/`, {
        email,
        password,
      });
      if (response.status === 200) {
        const { refresh, access } = response.data;
        setAuthTokens({ refresh, access });
        setUser(jwtDecode(response.data.access));
        localStorage.setItem("authTokens", JSON.stringify({ refresh, access }));
        navigate("/");
        return response.data;
      }
    } catch (errors) {
      return errors?.response?.data;
    }
  };

  const signupUser = async (email, username, password, password2) => {
    try {
      const response = await axios.post(`${API_URL}/api/signup/`, {
        email,
        username,
        password,
        password2,
      });
      if (response.status === 201) {
        navigate("/login");
        return response.data;
      }
    } catch (errors) {
      return errors?.response?.data;
    }
  };

  const forget_passwordUser = async (email) => {
    try {
      const response = await axios.post(`${API_URL}/api/password_reset/`, {
        email: email,
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (errors) {
      return errors?.response?.data;
    }
  };

  const re_passwordUser = async (
    email,
    token,
    re_password,
    confirm_re_password
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/password_reset/confirm/`,
        {
          email: email,
          token: token,
          new_password: re_password,
          confirm_new_password: confirm_re_password,
        }
      );
      if (response.status === 200) {
        navigate("/login");
        return response.data;
      }
    } catch (errors) {
      return errors?.response?.data;
    }
  };

  const logoutUser = useCallback(async () => {
    try {
      if (!authTokens?.refresh) {
        navigate("/login");
        return;
      }

      const response = await axios.post(`${API_URL}/api/logout/`, {
        refresh_token: authTokens.refresh,
      });

      if (response.status === 205) {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        axios.defaults.headers.common["Authorization"] = "";
        window.location.reload();
        return response.data;
      }
    } catch (errors) {
      setAuthTokens(null);
      setUser(null);
      localStorage.removeItem("authTokens");
      navigate("/login");
      window.location.reload();
      return errors?.response?.data;
    }
  }, [authTokens, navigate]);

  const updateToken = useCallback(async () => {
    try {
      if (!authTokens?.refresh) {
        throw new Error("No valid refresh token found.");
      }
      const response = await axios.post(`${API_URL}/api/token/refresh/`, {
        refresh: authTokens.refresh,
      });

      if (response.status === 200) {
        const updatedTokens = {
          ...authTokens,
          access: response.data.access,
        };
        setAuthTokens(updatedTokens);
        setUser(jwtDecode(updatedTokens.access));
        localStorage.setItem("authTokens", JSON.stringify(updatedTokens));
      }
    } catch (errors) {
      await logoutUser();
    }
  }, [authTokens, logoutUser]);

  const verifyToken = useCallback(async () => {
    try {
      if (!authTokens?.refresh) {
        throw new Error("No valid access token found.");
      }
      const response = await axios.post(`${API_URL}/api/token/verify/`, {
        token: authTokens.access,
      });

      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${authTokens.access}`;
      }
    } catch (error) {
      await updateToken();
    }
  }, [authTokens, updateToken]);

  useEffect(() => {
    const initializeAuth = async () => {
      if (authTokens) {
        if (
          window.location.pathname === "/login" ||
          window.location.pathname === "/signup" ||
          window.location.pathname === "/forget-password" ||
          window.location.pathname ===
            "/forget-password/reset-password-confirm/"
        ) {
          navigate("/");
        }
        await verifyToken();
      }
      setLoading(false);
    };

    initializeAuth();
  }, [authTokens, verifyToken, navigate]);

  const authContextValue = {
    user,
    authTokens,
    loginUser,
    signupUser,
    forget_passwordUser,
    re_passwordUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
