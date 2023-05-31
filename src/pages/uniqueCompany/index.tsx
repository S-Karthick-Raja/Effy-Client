/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { generateRandomColor } from "../../utils/randomColourGenerator";
import Map from "../../components/map";
import { useGetUniqueCompanyMutation } from "../../hooks/get/getUniqueCompany";
import UserCard from "../../components/cards/user";

interface People {
  user: {
    firstName: string;
    lastName: string;
    emailId: string;
    designation: string;
    id: string;
  };
  company: {
    companyName: string;
  };
}

const UniqueCompany: React.FC = (): React.ReactElement => {
  const RandomColour = generateRandomColor();

  const { getUniqueCompanyMutation, company, loading } =
    useGetUniqueCompanyMutation();

  useEffect(() => {
    getUniqueCompanyMutation.mutate();
  }, []);

  const latitude = parseInt(company?.latitude);
  const longitude = parseInt(company?.longitude);

  const [showAbt, setShowAbt] = useState(true);

  console.log(company, loading);

  return (
    <div className="w-full p-4 rounded-sm bg-white min-h-screen ">
      <div className="border-base border-cardBorder w-3/4 flex flex-col gap-3 rounded-base overflow-hidden">
        <div className="relative w-full h-[210px]">
          <h1 className="w-full h-40 bg-fontGrey1"></h1>
          <p
            style={{ backgroundColor: RandomColour }}
            className={`w-28 h-28 absolute top-24 left-24 font-medium text-white flex items-center justify-center text-5xl`}
          >
            {company.companyName?.split("")[0]}
          </p>
        </div>
        <div className="px-4 w-full flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-fontDark">
            {company.companyName}
          </h1>
          <p className="text-sm text-fontGrey1">{company.companyAddress}</p>
        </div>

        <div className="flex flex-col px-4 ">
          <div className="flex items-center">
            <h1
              onClick={() => setShowAbt(true)}
              className={`px-4 py-2 cursor-pointer text-base font-medium border-b-base ${
                showAbt ? "border-primary" : "border-cardBorder"
              } hover:border-b-primary`}
            >
              About
            </h1>
            <h1
              onClick={() => setShowAbt(false)}
              className={`px-4 py-2 cursor-pointer text-base font-medium border-b-base ${
                !showAbt ? "border-primary" : "border-cardBorder"
              } hover:border-b-primary`}
            >
              People{" "}
              {company.UserInCompany?.length > 0 ? (
                <>( {company.UserInCompany?.length} )</>
              ) : (
                ""
              )}
            </h1>
          </div>

          <span className="border-b-base border-cardBorder"></span>
        </div>

        {showAbt ? (
          <div className="px-4 w-full pb-4 min-h-fit">
            <Map latitude={latitude} longitude={longitude} />
          </div>
        ) : (
          <div className="px-4 pb-4 w-full min-h-fit flex flex-col items-start gap-4">
            <h1 className="text-xl font-medium">People</h1>

            {company.UserInCompany.length > 0 ? (
              <div className="flex items-start gap-4">
                {company.UserInCompany.map((data: People, index: number) => {
                  console.log("User:", data);
                  return (
                    <UserCard
                      key={index}
                      id={data?.user.id}
                      firstName={data?.user.firstName}
                      lastName={data?.user.lastName}
                      designation={data?.user.designation}
                      companyName={data?.company.companyName}
                    />
                  );
                })}
              </div>
            ) : (
              <button className="h-[300px] flex text-xl gap-2 font-medium hover:text-primary hover:underline items-center justify-center w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Add employee
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UniqueCompany;
