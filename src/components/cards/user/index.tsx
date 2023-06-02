/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { generateRandomColor } from "../../../utils/randomColourGenerator";
import { Link } from "react-router-dom";

interface UserCardProps {
  id: any;
  firstName: string;
  lastName: string;
  emailId: string;
  companyName: string;
  designation: string;
  UserInCompany: any;
  active: boolean;
}

interface UserCardApiProps {
  userData: UserCardProps;
}

const UserCard: React.FC<UserCardApiProps> = ({
  userData,
}): React.ReactElement => {
  const RandomColour = generateRandomColor();

  return (
    <div className="border-base w-fit flex flex-col gap-4 select-none cursor-pointer hover:shadow-md border-cardBorder rounded-base overflow-hidden">
      <div className=" h-fit w-fit flex items-start gap-4 p-4">
        <div className="relative">
          <h1
            style={{ backgroundColor: RandomColour }}
            className="w-[74px] h-[74px] rounded-full flex items-center justify-center text-4xl font-semibold text-white"
          >
            {userData.firstName?.split("")[0]}
          </h1>
          <p
            className={`w-6 h-6 rounded-full border-[4px] border-white ${
              userData?.active ? "bg-green-500" : "bg-red-500"
            }  z-50 top-2 absolute left-14`}
          ></p>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-fontDark font-medium hover:underline hover:text-primary">
            <Link to={`/user/${userData.id}`}>
              {" "}
              {userData.firstName} {userData.lastName}
            </Link>
          </h1>

          <div className="w-[159px]">
            <h1 className="text-sm font-normal truncate text-fontGrey1">
              {userData.emailId}
            </h1>
            <h1 className="text-sm font-normal truncate text-fontGrey1">
              {userData.designation}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
