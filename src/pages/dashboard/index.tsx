import React, { useEffect } from "react";
import AnalyticsCard from "../../components/cards/analytics";
import { useGetCompanyMutation } from "../../hooks/get/getAllCompanies";

const DashboardPage: React.FC = (): React.ReactElement => {

  const { getAllCompanyMutation, company, loading } = useGetCompanyMutation();

  useEffect(() => {
    getAllCompanyMutation.mutate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="w-full p-4 rounded-sm bg-white min-h-screen ">
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-lg font-medium">Analytics</h1>

        <div className="flex items-start gap-6">
          <AnalyticsCard count={company?.length} title="Companies" link="/companies" />
          <AnalyticsCard count={12} title="Users" link="/users" />
          <AnalyticsCard
            count={0}
            title="Deactivated Users"
            link="/deactivated/users"
          />
        </div>
      </div>

      {/* <div className="p-4">
        <h1 className="text-lg font-medium">Chart</h1>
      </div> */}
    </div>
  );
};

export default DashboardPage;
