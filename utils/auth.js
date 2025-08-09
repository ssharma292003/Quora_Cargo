// utils/auth.js

import axios from 'axios';

// ✅ Get current user from session (calls /api/auth/me)
export async function getCurrentUser() {
  try {
    const res = await axios.get('http://localhost:5000/api/auth/me', {
      withCredentials: true, // Send session cookie
    });
    return res.data.user; // { id, username, role, franchise_id }
  } catch (err) {
    return null; // Not logged in
  }
}

// ✅ Optional: Check if user has a specific role
export async function isRole(role) {
  const user = await getCurrentUser();
  return user?.role === role;
}

// ✅ Add this to fix your error
export async function getRole() {
  const user = await getCurrentUser();
  return user?.role || null;
}
