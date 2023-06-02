import React, { useEffect } from "react";
import { useGetCompanyMutation } from "../../hooks/get/getAllCompanies";
import CompanyCard from "../../components/cards/company";
import { useAtom } from "jotai";
import { InitialAddCompanyPopup } from "../../jotai/global";

interface CompanyData {
  id: string;
  companyName: string;
  companyAddress: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
  UserInCompany: Array<[]>;
}

const CompaniesPage: React.FC = (): React.ReactElement => {
  const { getAllCompanyMutation, company } = useGetCompanyMutation();
  useEffect(() => {
    getAllCompanyMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [, setAddCompany] = useAtom(InitialAddCompanyPopup);

  return (
    <div className="w-full p-4 rounded-sm bg-white min-h-screen ">
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-xl font-semibold text-fontDark">Companies List</h1>

        {company.length > 0 ? (
          <div className="w-full h-max flex items-center flex-wrap gap-4">
            {company.map((data: CompanyData, index: number) => {
              return <CompanyCard key={index} companyData={data} />;
            })}
          </div>
        ) : (
          <button type="button" onClick={() => setAddCompany(true)} className="w-full h-[400px] flex items-center justify-center text-xl font-medium text-primary hover:underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-9 h-9 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add Company
          </button>
        )}
      </div>
    </div>
  );
};

export default CompaniesPage;
