import React from "react";
import UserCard from "../../components/cards/user";

const UsersPage: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full p-4 rounded-sm flex flex-col gap-4 bg-white min-h-screen">
      <h1 className="px-4">Users Page</h1>
      <div className="px-4">
        <UserCard />
      </div>
    </div>
  );
};

export default UsersPage;
