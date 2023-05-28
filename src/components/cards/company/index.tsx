import React from "react";
import { generateRandomColor } from "../../../utils/randomColourGenerator";

interface CompanyData {
  companyName: string;
  companyAddress: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
  UserInCompany: Array<[]>;
}

interface CompanyCardProps {
  companyData: CompanyData;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  companyData,
}): React.ReactElement => {
  const { companyName, companyAddress, UserInCompany } = companyData;

  const RandomColour = generateRandomColor();

  return (
    <div className="border-base border-cardBorder w-[292px] rounded-base overflow-hidden">
      <div className="relative h-[144px]">
        <p className="w-full h-[90px] bg-fontGrey1"></p>
        <p
          style={{ backgroundColor: RandomColour }}
          className={`w-28 h-28 absolute top-8 left-24 rounded-full font-medium text-white flex items-center justify-center text-5xl`}
        >
          {companyName?.split("")[0]}
        </p>
      </div>
      <div className="h-max p-4 flex flex-col gap-2">
        <h1 className="text-lg font-medium w-full items-center">
          {companyName}
        </h1>
        <h1 className="w-full text-sm font-normal truncate">
          {companyAddress}
        </h1>
        <h1 className="text-sm font-medium">
          Total Employee:{" "}
          <span className="font-normal">{UserInCompany?.length}</span>
        </h1>
        <h1 className="text-sm font-medium text-primary flex items-center gap-1 hover:underline cursor-pointer">
          Get Location{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4 font-medium"
          >
            <path
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </h1>
      </div>
    </div>
  );
};

export default CompanyCard;
