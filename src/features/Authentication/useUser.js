import { useMutation } from "@tanstack/react-query";
import { getCurrentUserServiceAPI } from "../../services/userService";

function useUser() {
  const {
    data: currentUser,
    isPending,
    mutate: getCurrentUser,
  } = useMutation({
    mutationFn: () => getCurrentUserServiceAPI(),
  });
  return { currentUser, isPending, getCurrentUser };
}

export default useUser;
