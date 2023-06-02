/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Map from "../../components/map";
import { useGetUniqueCompanyMutation } from "../../hooks/get/getUniqueCompany";
import { useNavigate } from "react-router-dom";

const CompanyAddress: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();

  const { getUniqueCompanyMutation, company } = useGetUniqueCompanyMutation();

  useEffect(() => {
    getUniqueCompanyMutation.mutate();
  }, []);

  const center = {
    lat: parseFloat(company?.latitude),
    lng: parseFloat(company?.longitude),
  };

  return (
    <div className="w-full p-4 rounded-sm flex flex-col gap-4 bg-white min-h-screen ">
      <h1 className="text-2xl px-4 font-medium text-fontDark flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 font-medium text-fontGrey1 hover:text-fontDark"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </button>{" "}
        Location for [{company?.companyName}]
      </h1>
      <div className="px-4 w-full min-h-screen">
        <Map latitude={center.lat} longitude={center.lng} />
      </div>
    </div>
  );
};

export default CompanyAddress;
