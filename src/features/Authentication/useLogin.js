import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../services/userService";
import { setLocalStorageToken } from "../../utils/helper";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const { isLoading, mutate: defaultLogin } = useMutation({
    mutationFn: ({ usernameOrEmail, password, roleType }) =>
      loginAPI({ usernameOrEmail, password, roleType }),
    onSuccess: (user) => {
      setLocalStorageToken(user.tokenDTO);
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.response.data.detail);
    },
  });
  return { isLoading, defaultLogin };
}

export default useLogin;
