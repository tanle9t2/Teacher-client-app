import { API } from "../utils/axiosConfig";

export async function getOauthURLAPI() {
  const res = await API.get("auth/oauth-url");
  return res.data.data;
}

export async function loginoauthService(authorizationCode) {
  const res = await API.post("auth/oauth/login", {
    authorizationCode: authorizationCode,
  });
  return res.data.data;
}
