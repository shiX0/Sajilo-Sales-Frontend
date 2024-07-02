import "./App.css";
import Login from "./pages/login/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Register from "./pages/register/register";
import Customer from "./pages/admin/customer";
import Home from "./pages/admin/home";
import Products from "./pages/admin/products";
import Orders from "./pages/admin/orders";
import Analytics from "./pages/admin/analytics";
import Settings from "./pages/admin/settings";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "./pages/dashboard/dashboard";
import UserProfile from "./pages/profile/profile";
import ForgotPassword from "./pages/forgotpassword/forgotPassword";

library.add(faSun, faMoon);

function App() {
  return (
    <>
      <Router>
        <Toaster />
        <Routes>
          {/* dashboard */}
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customer />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* profile */}
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
