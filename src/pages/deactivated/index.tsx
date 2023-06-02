/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import UserCard from "../../components/cards/user";
import { useGetUsersMutation } from "../../hooks/get/getAllUsers";
import { InitialAddUserPopup } from "../../jotai/global";
import { useAtom } from "jotai";
import { useGetAllDeactivUsersMutation } from "../../hooks/get/getAllDeactivatedUsers";

interface UserCardProps {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  designation: string;
  emailId: string;
  UserInCompany: any;
  active: boolean;
}

const DeactivatedUserPage: React.FC = (): React.ReactElement => {
  const { getAllDeactivatedUsersMutation, users} = useGetAllDeactivUsersMutation();
  const [, setAddUser] = useAtom(InitialAddUserPopup);

  useEffect(() => {
    getAllDeactivatedUsersMutation.mutate();
  }, []);

  return (
    <div className="w-full p-4 rounded-sm bg-white min-h-screen">
      <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-semibold text-fontDark">Deactivated Users List</h1>

      {users.length > 0 ? (
        <div className="px-4 flex items-center gap-4 flex-wrap">
          {users.map((data: UserCardProps, index: number) => {
            return <UserCard key={index} userData={data} />;
          })}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAddUser(true)}
          className="w-full h-[400px] flex items-center justify-center text-xl font-medium text-primary hover:underline"
        >
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
          Add User
        </button>
      )}
      </div>
    </div>
  );
};

export default DeactivatedUserPage;
