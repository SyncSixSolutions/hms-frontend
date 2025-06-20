import jwtDecode from "jwt-decode";

export function getUserRole() {
  const token = localStorage.getItem("token"); 
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.realm_access?.roles || []; 
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}