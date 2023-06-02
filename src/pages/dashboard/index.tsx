/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import AnalyticsCard from "../../components/cards/analytics";
import { useGetCompanyMutation } from "../../hooks/get/getAllCompanies";
import { useGetUsersMutation } from "../../hooks/get/getAllUsers";
import { useGetAllDeactivUsersMutation } from "../../hooks/get/getAllDeactivatedUsers";
import companyPage from "../../assets/company.png";
import userPage from "../../assets/user.png";
import Typewriter from "typewriter-effect";

const DashboardPage: React.FC = (): React.ReactElement => {
  const { getAllCompanyMutation, company } = useGetCompanyMutation();
  const { getAllUsersMutation, users } = useGetUsersMutation();
  const { getAllDeactivatedUsersMutation, users: deactivatedUser } =
    useGetAllDeactivUsersMutation();

  useEffect(() => {
    getAllCompanyMutation.mutate();
    getAllUsersMutation.mutate();
    getAllDeactivatedUsersMutation.mutate();
  }, []);

  console.log(import.meta.env.MAP_API_URL)

  return (
    <div className="w-full p-4 rounded-sm bg-white min-h-screen ">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-lg font-medium">Analytics</h1>

          <div className="flex items-start justify-around">
            <AnalyticsCard
              count={company?.length}
              title="Companies"
              link="/companies"
            />
            <AnalyticsCard count={users?.length} title="Users" link="/users" />

            <AnalyticsCard
              count={deactivatedUser?.length}
              title="Deactivated Users"
              link="/deactivated/users"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 p-4">
          <hr></hr>

          <h1 className="text-4xl font-extrabold uppercase text-secondary text-center">
            <Typewriter
              options={{
                strings: [
                  "Manage Company",
                  "Manage Users",
                  "Assign users to company",
                  "Migrate users to other company",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>

          <hr></hr>

          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-fontDark capitalize  flex items-center gap-2 justify-center w-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                />
              </svg>
              Company Page
            </h1>
            <img
              className="w-[700px] shadow-md rounded-md h-[350px] object-contain"
              src={companyPage}
              alt="company-demo"
            />
          </div>

          <div className="flex items-center justify-between">
            <img
              className="w-[700px] shadow-md rounded-md h-[350px] object-contain"
              src={userPage}
              alt="userPage-demo"
            />
            <h1 className="text-3xl font-bold text-fontDark capitalize  flex items-center gap-2 justify-center w-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                  clip-rule="evenodd"
                />
                <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
              </svg>
              Users Page
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
