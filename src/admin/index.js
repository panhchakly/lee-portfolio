import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import VerifyCode from "./Pages/Auth/VerifyCode";
function Admin() {
  return (
      <Routes>
          <Route index element={<Layout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
      </Routes>
  );
}

export default Admin;