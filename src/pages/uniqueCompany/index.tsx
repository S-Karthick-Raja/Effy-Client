/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { generateRandomColor } from "../../utils/randomColourGenerator";
import Map from "../../components/map";
import { useGetUniqueCompanyMutation } from "../../hooks/get/getUniqueCompany";
import { Link } from "react-router-dom";
import PopupVarient1 from "../../components/popup";
import AddUserToSpecificCompanyForm from "../../form/addUserToSpecificCompany";
import RemoveUserFromCompanyForm from "../../form/removeUserFromCompany";

const UniqueCompany: React.FC = (): React.ReactElement => {
  const RandomColour = generateRandomColor();

  const { getUniqueCompanyMutation, company } = useGetUniqueCompanyMutation();

  useEffect(() => {
    getUniqueCompanyMutation.mutate();
  }, []);

  const latitude = parseFloat(company?.latitude);
  const longitude = parseFloat(company?.longitude);

  const [showAbt, setShowAbt] = useState(true);

  const [addUserToSpeCompany, setAddUserToSpeCompany] = useState(false);
  const [removeUserToSpeCompany, setRemoveUserToSpeCompany] = useState(false);

  return (
    <div className="w-full p-4 rounded-sm bg-white min-h-screen select-none ">
      <div className="border-base border-cardBorder w-3/4 flex flex-col gap-3 rounded-base overflow-hidden">
        <div className="relative w-full h-[210px]">
          <h1 className="w-full h-40 bg-fontGrey1"></h1>
          <p
            style={{ backgroundColor: RandomColour }}
            className={`w-28 h-28 absolute top-24 left-24 font-medium text-white flex items-center justify-center text-5xl`}
          >
            {company.companyName?.split("")[0].toLocaleUpperCase()}
          </p>
        </div>
        <div className="px-4 w-full flex flex-col gap-2">
          <h1 className="text-2xl font-semibold capitalize text-fontDark">
            {company.companyName}
          </h1>
          <p className="text-sm text-fontGrey1">{company.companyAddress}</p>
        </div>

        <div className="flex flex-col px-4 ">
          <div className="flex items-center justify-between">
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
            {company?.UserInCompany?.length > 0 && (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setAddUserToSpeCompany(true)}
                  className="h-fit flex text-sm gap-2 text-fontDark rounded-sm bg-green-400 px-3 py-2 font-medium hover:text-fontGrey1 active:text-fontDark items-center justify-center w-fit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Add employee
                </button>

                <button
                  onClick={() => setRemoveUserToSpeCompany(true)}
                  className="h-fit flex text-sm gap-2 text-fontDark rounded-sm bg-red-400 px-3 py-2 font-medium hover:text-fontGrey1 active:text-fontDark items-center justify-center w-fit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Remove employee
                </button>
              </div>
            )}
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
                {company.UserInCompany.map((data: any, index: number) => {
                  console.log(data);
                  return (
                    <div
                      key={index}
                      className="border-base w-fit flex flex-col gap-4 select-none cursor-pointer hover:shadow-md border-cardBorder rounded-base overflow-hidden"
                    >
                      <div className=" h-fit w-fit flex items-start gap-4 p-4">
                        <h1
                          style={{ backgroundColor: RandomColour }}
                          className="w-[74px] h-[74px] rounded-full flex items-center justify-center text-4xl font-semibold text-white"
                        >
                          {data?.user.firstName.split("")[0]}
                        </h1>

                        <div className="flex flex-col gap-2">
                          <h1 className="text-fontDark font-medium hover:underline hover:text-primary">
                            <Link to={`/user/${data?.user.id}`}>
                              {" "}
                              {data?.user.firstName} {data?.user.lastName}
                            </Link>
                          </h1>

                          <div className="w-[159px]">
                            <h1 className="text-sm font-normal truncate text-fontGrey1">
                              {data?.user.emailId}
                            </h1>
                            <h1 className="text-sm font-normal truncate text-fontGrey1">
                              {data?.user.designation}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <button
                onClick={() => setAddUserToSpeCompany(true)}
                className="h-[300px] flex text-xl gap-2 font-medium hover:text-primary hover:underline items-center justify-center w-full"
              >
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

      <PopupVarient1
        open={addUserToSpeCompany}
        setOpen={setAddUserToSpeCompany}
        children={<AddUserToSpecificCompanyForm companyData={company.id} />}
        handleCloseBlur={() => setAddUserToSpeCompany(false)}
        handleCloseButton={() => setAddUserToSpeCompany(false)}
        header={`Add user to company “${company.companyName}”`}
        topAlign={false}
      />

      <PopupVarient1
        open={removeUserToSpeCompany}
        setOpen={setRemoveUserToSpeCompany}
        children={<RemoveUserFromCompanyForm companyData={company.id} />}
        handleCloseBlur={() => setRemoveUserToSpeCompany(false)}
        handleCloseButton={() => setRemoveUserToSpeCompany(false)}
        header={`Remove user from “${company.companyName}”`}
        topAlign={false}
      />
    </div>
  );
};

export default UniqueCompany;
