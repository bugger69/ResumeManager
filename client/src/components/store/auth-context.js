import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("IsLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("IsLoggedIn", "1");
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const storedLogIn = localStorage.getItem("IsLoggedIn");
    if (storedLogIn === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
