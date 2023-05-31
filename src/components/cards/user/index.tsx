import React from "react";
import { generateRandomColor } from "../../../utils/randomColourGenerator";

interface UserCardProps {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  designation: string;
}

const UserCard: React.FC<UserCardProps> = ({
  id = "",
  firstName = "",
  lastName = "",
  companyName = "",
  designation = "",
}): React.ReactElement => {

    const RandomColour = generateRandomColor();

  return (
    <div className="border-base w-fit flex flex-col gap-4 select-none cursor-pointer hover:shadow-md border-cardBorder rounded-base overflow-hidden">
      <div className=" h-fit w-fit flex items-start gap-4 p-4">
        <h1 
        style={{ backgroundColor: RandomColour }}
        className="w-[74px] h-[74px] rounded-full flex items-center justify-center text-4xl font-semibold text-white">
          {firstName?.split("")[0]}
        </h1>

        <div className="flex flex-col gap-2">
          <h1 className="text-fontDark font-medium">
            {firstName} {lastName}
          </h1>

          <div>
            <h1 className="text-sm font-normal text-fontGrey1">
              {companyName}
            </h1>
            <h1 className="text-sm font-normal text-fontGrey1">
              {designation}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
