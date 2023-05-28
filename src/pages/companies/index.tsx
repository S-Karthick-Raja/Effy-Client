import React, { useEffect } from "react";
import { useGetCompanyMutation } from "../../hooks/get/getAllCompanies";
import CompanyCard from "../../components/cards/company";

interface CompanyData {
  companyName: string;
  companyAddress: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
  UserInCompany: Array<[]>;
}

const CompaniesPage: React.FC = (): React.ReactElement => {
  const { getAllCompanyMutation, company, loading } = useGetCompanyMutation();

  useEffect(() => {
    getAllCompanyMutation.mutate();
  }, []);
  return (
    <div className="w-full p-4 rounded-sm bg-white min-h-screen ">
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-lg font-medium text-fontDark">
          {loading ? "Loading" : "Companies List"}
        </h1>

        <div className="w-full flex items-center flex-wrap gap-4">
          {company.map((data: CompanyData, index: number) => {
            return <CompanyCard key={index} companyData={data} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
