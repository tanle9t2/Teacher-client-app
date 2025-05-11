import { createContext, useContext, useEffect, useState } from "react";
import useUser from "../features/Authentication/useUser";
import { getAccessToken } from "../utils/helper";
import useLogin from "../features/Authentication/useLogin";
import useGoogleLogin from "../features/Authentication/useGoogleLogin";
import useRegister from "../features/Authentication/useRegister";
import useLogout from "../features/Authentication/useLogout";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { defaultLogin } = useLogin();
  const { redirectGoogleLogin, googleLogin, getOauthAuthorizationCode } =
    useGoogleLogin();
  const { register } = useRegister();
  const { logout } = useLogout();
  const { getCurrentUser } = useUser();

  useEffect(() => {
    async function init() {
      if (getAccessToken() == null) {
        setIsLoading(false);
        return;
      }
      if (user == null) {
        getCurrentUser(null, {
          onSuccess: (fetchedUser) => {
            setIsLoading(false);
            setUser(fetchedUser);
          },
        });
      } else setIsLoading(false);
    }
    init();
  }, [user]);

  function defaultUserLogin(data) {
    defaultLogin(data, {
      onSuccess: (loggedInUser) => {
        setUser(loggedInUser);
      },
    });
  }

  function googleUserLogin(data) {
    googleLogin(data, {
      onSuccess: (loggedInUser) => {
        setUser(loggedInUser);
      },
    });
  }

  function defaultUserRegister(data) {
    register(data);
  }

  return (
    <AuthContext.Provider
      value={{
        defaultUserRegister,
        defaultUserLogin,
        googleUserLogin,
        redirectGoogleLogin,
        logout,
        getOauthAuthorizationCode,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
