import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { setLocalStorageToken } from "../../utils/helper";

import { getOauthURLAPI, loginoauthService } from "../../services/oauthService";

function useGoogleLogin() {
  const navigate = useNavigate();

  const { mutate: googleLogin } = useMutation({
    mutationFn: (authorizationCode) => loginoauthService(authorizationCode),
    onSuccess: (user) => {
      setLocalStorageToken(user.tokenDTO);
      navigate("/");
    },
    onError: (err) => {
      navigate("/auth/login");
      console.log(err);
      toast.error(`Error with status code ${err.response.status}`);
    },
  });

  async function getOauthAuthorizationCode() {
    const hashParams = new URLSearchParams(window.location.search);
    return hashParams.get("code");
  }

  async function redirectGoogleLogin() {
    try {
      const oauthUrl = await getOauthURLAPI();
      window.location.assign(oauthUrl);
    } catch (err) {
      toast.error(err.message);
    }
  }
  return { redirectGoogleLogin, googleLogin, getOauthAuthorizationCode };
}

export default useGoogleLogin;
