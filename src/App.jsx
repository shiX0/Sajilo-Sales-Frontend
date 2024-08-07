import "./App.css";
import Login from "./pages/auth/login/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Register from "./pages/auth/register/register";
import Home from "./pages/admin/home";
import Products from "./pages/admin/products";
import Orders from "./pages/admin/orders";
import Analytics from "./pages/admin/analytics";
import Settings from "./pages/admin/settings";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "./pages/dashboard/dashboard";
import UserProfile from "./pages/profile/profile";
import ForgotPassword from "./pages/auth/forgotpassword/forgotPassword";
import ClientDashboard from "./pages/client/clientDashboard";
import ClientPos from "./pages/client/clientPos";
import ClientProfile from "./pages/client/clientprofile";
import ClientInvoices from "./pages/client/clientInvoices";
import { ClientCustomers } from "./pages/client/clientCustomers";
import Customer from "./pages/admin/customer";

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

          {/* Client */}
          <Route path="/client/dashboard" element={<ClientDashboard />}>
            <Route index element={<ClientPos />} />
            <Route path="home" element={<ClientPos />} />
            <Route path="profile" element={<ClientProfile />} />
            <Route path="invoice" element={<ClientInvoices />} />
            <Route path="customer" element={<ClientCustomers />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
