const API_BASE = import.meta.env.VITE_API_URL;
export const REGISTER_API = `${API_BASE}/api/auth/register`;
export const LOGIN_API = `${API_BASE}/api/auth/login`;
export const FORGOT_PASSWORD_API = `${API_BASE}/api/auth/forgot-password`;