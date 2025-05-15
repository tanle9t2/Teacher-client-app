import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfileAPI } from "../../services/userService";
import toast from "react-hot-toast";

function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateUserProfile } = useMutation({
    mutationFn: (data) => updateUserProfileAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.response.data.detail);
    },
  });
  return { isLoading, updateUserProfile };
}

export default useUpdateUserProfile;
