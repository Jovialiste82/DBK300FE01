// frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen.jsx";
import SignupScreen from "./screens/SignupScreen.jsx";
import LobbyScreen from "./screens/LobbyScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import CapsulesScreen from "./screens/CapsulesScreen.jsx";
import InvitationsScreen from "./screens/InvitationsScreen.jsx";
import AdminScreen from "./screens/AdminScreen.jsx";
import PageNotFound from "./screens/PageNotFound.jsx";
import RoomScreen from "./screens/RoomScreen.jsx";
import InformationScreen from "./screens/InformationScreen.jsx";
import Layout from "./components/Layout.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* public routes */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />

      {/* Protected Routes within Layout */}
      <Route element={<Layout />}>
        {/* Other protected routes without specific role requirements */}
        <Route index path="/lobby" element={<LobbyScreen />} />
        <Route path="/room/:room" element={<RoomScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/capsules" element={<CapsulesScreen />} />
        <Route path="/invitations" element={<InvitationsScreen />} />
        <Route path="/information" element={<InformationScreen />} />

        {/* Use RequireAuth for RBAC */}
        <Route
          path="/admin"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <AdminScreen />
            </RequireAuth>
          }
        />
        {/* Add more protected routes as needed */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
