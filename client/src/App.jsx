import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./ui/Home";
import Admin from "./ui/Admin";
import CompanyDashboard from "./ui/CompanyDashboard";
import UtilityPayments from "./ui/UtilityPayments";
import UtilityServiceProviders from "./ui/UtilityServiceProviders";
import NavBar from "./navigation/NavBar";
export default function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<Admin />} />
        <Route path="utility-payments" element={<UtilityPayments />}>
          <Route path="service-providers" element={<UtilityServiceProviders/>}/>
        </Route>
        <Route path="company-dashboard" element={<CompanyDashboard />} />
      </Routes>
    </div>
  )
}
