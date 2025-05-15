// import { setLocalStorageToken } from "../utils/helper";
import { AUTH_REQUEST, API } from "../utils/axiosConfig";

export async function getCurrentUserServiceAPI() {
  const res = await AUTH_REQUEST.get("/user/profile");

  if (res.status != 200) throw new Error("error");

  const data = res.data.data;
  data.isAuthenticated = true;
  return data;
}

export async function uploadEditAvatarAPI(FormData) {
  const res = await AUTH_REQUEST.post("/users/upload-avt", FormData);
  if (res.status != 200) throw new Error(res.data.message);

  return res.data.data;
}

export async function updateUserProfileAPI(data) {
  const res = await AUTH_REQUEST.post("/api/v1/user/update-profile", data);
  return res.data.data;
}

export async function loginAPI({ usernameOrEmail, password }) {
  const res = await API.post("auth/login", {
    usernameOrEmail: usernameOrEmail,
    password: password,
  });
  if (res.status != 200) throw new Error(res.data.message);
  const data = res.data.data;

  return data;
}

export async function loginoauthService({ email, name }) {
  const res = await API.post("/auth/oauth/login", {
    email: email,
    name: name,
  });
  if (res.status != 200) throw new Error(res.data.message);
  const data = res.data.data;

  data.isAuthenticated = true;

  return data;
}

export async function registerAPI({
  name,
  email,
  username,
  password,
  repeatPassword,
}) {
  const res = await API.post("/auth/register", {
    name: name,
    email: email,
    username: username,
    password: password,
    confirmedPassword: repeatPassword,
  });
  if (res.status != 200 || res.status != 201) throw new Error(res.data.message);
}

export async function logoutAPI() {
  const res = await AUTH_REQUEST.post("/auth/logout");
  if (res.status != 200 && res.status != 201) throw new Error(res.data.message);
}
