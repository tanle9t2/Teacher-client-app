import { useQuery } from "@tanstack/react-query";
import { getCurrentuserService } from "../../services/userService";


export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentuserService,
    retry: 1,
  });
  return { isLoading, user };
}


