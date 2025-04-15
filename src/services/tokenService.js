import { API } from "../utils/axiosConfig";
import { getRefreshToken } from "../utils/helper";

export async function refreshToken() {
  const res = await API.post(
    "/api/v1/auth/refresh-token",
    JSON.stringify({
      refreshToken: getRefreshToken(),
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.status != 200) throw new Error("Error fetching");

  return res.data.data;
}
