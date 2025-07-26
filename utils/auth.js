// quora-frontend/utils/auth.js
export function getToken() {
  return localStorage.getItem('token');
}

export function getRole() {
  try {
    const token = getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch {
    return null;
  }
}
