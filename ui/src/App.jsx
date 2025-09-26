import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./ui/Home";
import Admin from "./ui/Admin";
import CompanyDashboard from "./ui/CompanyDashboard";
import UtilityPayments from "./ui/UtilityPayments";
import NavBar from "./navigation/NavBar";
import Footer from "./ui/Footer";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { autoConnectWallet } from "./global/auth/autoConnectWalletThunk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chains, config } from "./wagmiConfig";
import "@rainbow-me/rainbowkit/styles.css";
export default function App() {
  // const { address } = useSelector((state) => state.wallet);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (window.ethereum) {
  //     dispatch(autoConnectWallet());
  //   }
  // }, [address]);
  const queryClient = new QueryClient();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="admin" element={<Admin />}></Route>
                <Route path="utility-payments" element={<UtilityPayments />}>
                  {/* <Route path="service-providers" element={<UtilityServiceProviders/>}/> */}
                </Route>
                <Route path="company-dashboard" element={<CompanyDashboard />} />
              </Routes>
            </div>
            <div className="">
              <Footer />
            </div>
            <ToastContainer
              position="top-right"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnHover
              draggable
              theme="colored"
            />
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
