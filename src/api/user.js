import { getToken } from "../utils/token";

export async function getMe() {
  const token = getToken();
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
  const res = await fetch(`${API_BASE}/api/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}
