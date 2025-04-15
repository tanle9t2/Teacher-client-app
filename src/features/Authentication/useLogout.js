import { useNavigate } from "react-router-dom";
import {
  AuthenticationHeader,
  removeLocalStorageToken,
} from "../../utils/helper";
import { useMutation } from "@tanstack/react-query";
import { logoutAPI } from "../../services/userService";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/modalSlide";

import toast from "react-hot-toast";

function useLogout() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: logout } = useMutation({
    mutationFn: async function () {
      try {
        await logoutAPI();
      } catch (err) {
        console.log(err)
      }
    },
    onSuccess: () => {
      dispatch(modalActions.resetState());
      navigate("/auth/login");
      removeLocalStorageToken();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { logout };
}

export default useLogout;
