import HomeLayout from "./layouts/homeLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import CompaniesPage from "./pages/companies";
import UsersPage from "./pages/users";
import DeactivatedUserPage from "./pages/deactivated";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UniqueCompany from "./pages/uniqueCompany";
import CompanyAddress from "./pages/companyAddress";
import UniqueUser from "./pages/uniqueUser";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route path="" element={<DashboardPage />} />
            <Route path="companies" element={<CompaniesPage />} />
            <Route path="companies/update/:id" element={<CompaniesPage />} />
            <Route path="company/:id" element={<UniqueCompany />} />
            <Route path="company/address/:id" element={<CompanyAddress />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="user/:id" element={<UniqueUser />} />
            <Route path="deactivated/users" element={<DeactivatedUserPage />} />
          </Route>
        </Routes>
      </Router>
      <Toaster
        containerStyle={{
          zIndex: 99999,
          fontSize: "14px",
          fontFamily: "poppins",
          fontWeight: "normal",
        }}
        position="bottom-right"
        reverseOrder={true}
      />
    </QueryClientProvider>
  );
};

export default App;
