import './App.css';
import { useAccount, WagmiProvider } from 'wagmi';
import { chains, config } from './contract/utils/wagmiConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { NavBar } from './ui-components/nav/NavBar';
import { Routes, Route } from 'react-router-dom';
import { SchoolDashboard } from './ui-components/school/SchoolDashboard';
import { Home } from './ui-components/home/Home';
import { ClientDashboard } from './ui-components/client/ClientDashboard';
import '@rainbow-me/rainbowkit/styles.css';
import { Admin } from './ui-components/admin/Admin';
import { Footer } from './ui-components/footer/Footer';
import { MobileNavBar } from './ui-components/nav/MobileNavBar';
import ReceiptPDF from './ui-components/client/ReceiptPDF';
import { PlatformPayments } from './ui-components/public/PlatformPayments';

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>
          <div className="min-h-screen flex flex-col  bg-gray-700">
            <div className="flex-grow">
              <NavBar />
              <MobileNavBar />
              <div className="px-3 sm:px-10 py-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="school" element={<SchoolDashboard />} />
                  <Route path="/client" element={<ClientDashboard />}>
                    {/* <Route path="receipt" element={<ReceiptPDF />} /> */}
                  </Route>
                  <Route path="admin" element={<Admin />} />
                  <Route path="payments" element={<PlatformPayments />} />
                </Routes>
              </div>
            </div>
            <Footer />
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
