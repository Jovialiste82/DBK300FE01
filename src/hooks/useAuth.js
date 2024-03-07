// src/hooks/useAuth.js
import { useSelector } from "react-redux";
import { memberMenu, adminMenu } from "../config/menus.js";

const getRole = (user) => {
  if (user?.role === "admin") return "admin";
  if (user?.role === "mod") return "mod";
  if (user?.role === "advertiser") return "advertiser";
  return "member"; // default role
};

const getMenu = (role) => {
  if (role === "admin") return adminMenu;
  if (role === "mod") return adminMenu;
  return memberMenu; // default menu
};

const useAuth = () => {
  const user = useSelector((state) => state.auth.userInfo);

  const isLoggedIn = !!user;

  const hasRole = (...roles) => roles.includes(user?.role);
  const role = getRole(user);
  const menu = getMenu(role);
  // console.log({ isLoggedIn, user, hasRole, role, menu });

  return { isLoggedIn, user, hasRole, role, menu };
};

export default useAuth;
