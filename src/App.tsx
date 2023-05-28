import HomeLayout from "./layouts/homeLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import DashboardPage from "./pages/dashboard";
import CompaniesPage from "./pages/companies";
import UsersPage from "./pages/users";
import DeactivatedUserPage from "./pages/deactivated";

const App = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="companies" element={<CompaniesPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="deactivated/users" element={<DeactivatedUserPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
