
import { removeLocalStorageToken } from "../../utils/helper";
import { useMutation } from "@tanstack/react-query";
import { logoutAPI } from "../../services/userService";
import toast from "react-hot-toast";

function useLogout() {
  const { mutate: logout } = useMutation({
    mutationFn: () => logoutAPI(),
    onSuccess: () => {
      window.location.href = "/";
      removeLocalStorageToken();
    },
    onError: (err) => {
      toast.error(err.response.data.detail);
    },
  });
  return { logout };
}

export default useLogout;
