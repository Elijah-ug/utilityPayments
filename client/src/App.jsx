import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./ui/Home";
import Admin from "./ui/Admin";
import CompanyDashboard from "./ui/CompanyDashboard";
import UtilityPayments from "./ui/UtilityPayments";
import UtilityServiceProviders from "./ui/UtilityServiceProviders";
import NavBar from "./navigation/NavBar";
import Footer from "./ui/Footer";
import { RegisterCompany } from "./ui/RegisterCompany";
import { UpdateRates } from "./ui/UpdateRates";
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="admin" element={<Admin />}>
            <Route path="register-company" element={<RegisterCompany />} />
            <Route path="update-fees" element={<UpdateRates />} />
          </Route>
        <Route path="utility-payments" element={<UtilityPayments />}>
          <Route path="service-providers" element={<UtilityServiceProviders/>}/>
        </Route>
        <Route path="company-dashboard" element={<CompanyDashboard />} />
      </Routes>
      </div>
      <Footer/>
    </div>
  )
}
