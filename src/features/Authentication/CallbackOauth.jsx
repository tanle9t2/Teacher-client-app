
import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
function CallbackOauth() {
  const [dotLoading, setDotLoading] = useState("");
  const { googleUserLogin, getOauthAuthorizationCode } = useAuth();

  useEffect(() => {
    console.log();
    setInterval(() => {
      setDotLoading((state) => {
        return state.length >= 3 ? "" : state + ".";
      });
    }, 500);

    (async function login() {
      const authorizationCode = await getOauthAuthorizationCode();
      googleUserLogin(authorizationCode);
    })();
  }, []);
  return <div className="text-3xl">Logging in {dotLoading}</div>;
}

export default CallbackOauth;
