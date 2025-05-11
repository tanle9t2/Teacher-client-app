import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../../services/userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useRegister() {
  const navigate = useNavigate();
  const { isLoading, mutate: register } = useMutation({
    mutationFn: ({
      firstName,
      lastName,
      email,
      username,
      password,
      repeatPassword,
    }) =>
      registerAPI({
        firstName,
        lastName,
        email,
        username,
        password,
        repeatPassword,
      }),
    onSuccess: () => {
      navigate("/auth/login");
    },
    onError: (err) => {
      toast.error(err.response.data.detail);
    },
  });
  return { isLoading, register };
}

export default useRegister;
