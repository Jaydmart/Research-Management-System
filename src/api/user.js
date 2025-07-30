import { getToken } from "../utils/token";

export async function getMe() {
  const token = getToken();
  const res = await fetch("http://localhost:4000/api/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}
