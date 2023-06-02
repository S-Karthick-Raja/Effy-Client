/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { generateRandomColor } from "../../utils/randomColourGenerator";
import { useGetUniqueUserMutation } from "../../hooks/get/getUniqueUser";
import { Menu, Transition } from "@headlessui/react";
import PopupVarient1 from "../../components/popup";
import PrimaryBtn from "../../components/button";
import { useDeleteUserMutation } from "../../hooks/delete/deleteUser";
import AddUserCompanyForm from "../../form/addUserCompany";
import MigrationForm from "../../form/migrationForm";
import { useDeActivateUserMutation } from "../../hooks/put/deActivateUser";
import EditUserForm from "../../form/editUser";

const UniqueUser: React.FC = (): React.ReactElement => {
  const RandomColour = generateRandomColor();

  const { getUniqueUserMutation, user } = useGetUniqueUserMutation();
  const { deleteUserMutation } = useDeleteUserMutation();
  const { updateDeactivateUserMutation } = useDeActivateUserMutation();

  useEffect(() => {
    getUniqueUserMutation.mutate();
  }, []);

  const [showAbt, setShowAbt] = useState(true);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showAddToCompanyPopup, setShowAddToCompany] = useState(false);
  const [migrateUserToCompany, setMigrateUserToCompany] = useState(false);
  const [deactivateUserPopup, setDeactivateUserPopup] = useState(false);
  const [updateUserPopup, setUpdateUserPopup] = useState(false);

  return (
    <div className="w-full p-4 rounded-sm bg-white min-h-screen select-none ">
      <div className="border-base border-cardBorder w-1/2 flex flex-col gap-3 rounded-base overflow-hidden">
        <div className="relative w-full h-[210px]">
          <h1 className="w-full h-40 bg-fontGrey1"></h1>
          <p
            style={{ backgroundColor: RandomColour }}
            className={`w-28 h-28 absolute top-24 left-24 font-medium border-[4px] border-white shadow-lg text-white rounded-full flex items-center justify-center text-5xl`}
          >
            {user.firstName?.split("")[0].toLocaleUpperCase()}
          </p>
          <p
            className={`w-6 h-6 rounded-full border-[4px] border-white ${
              user.active ? "bg-green-500" : "bg-red-500"
            }  z-50 top-[100px] absolute left-[180px]`}
          ></p>
        </div>

        <div className="flex flex-col px-4 ">
          <div className="flex items-center justify-between">
            <h1
              onClick={() => setShowAbt(true)}
              className={`px-4 py-2 cursor-pointer h-[48px] text-base font-medium border-b-base ${
                showAbt ? "border-primary" : "border-cardBorder"
              } hover:border-b-primary`}
            >
              About
            </h1>

            <Menu as="div" className="relative ">
              <div className="w-full flex justify-end px-3 py-3">
                <Menu.Button className="outline-none  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-fontGrey2 hover:text-fontDark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="w-56 absolute right-4 z-50  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    {JSON.stringify(user?.UserInCompany) === "[]" ? (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bg-primary text-white" : "text-gray-900"
                            } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium`}
                            onClick={() => setShowAddToCompany(true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                            Add to company
                          </button>
                        )}
                      </Menu.Item>
                    ) : (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bg-primary text-white" : "text-gray-900"
                            } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium`}
                            onClick={() => setMigrateUserToCompany(true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                              />
                            </svg>
                            Migrate
                          </button>
                        )}
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-primary text-white" : "text-gray-900"
                          } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium`}
                          onClick={() => setUpdateUserPopup(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                          Edit
                        </button>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-primary text-white" : "text-gray-900"
                          } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium`}
                          onClick={() => setDeactivateUserPopup(true)}
                        >
                          {user.active ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          )}

                          {user.active ? "Deactivate" : "activate"}
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-primary text-white" : "text-gray-900"
                          } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium`}
                          onClick={() => {
                            setShowDeletePopup(true);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <span className="border-b-base border-cardBorder mb-4"></span>

          <div className="px-4 w-full flex flex-col gap-5 mb-6">
            <h1 className="text-2xl font-semibold capitalize text-fontDark">
              Name : {user.firstName} {user.lastName}
            </h1>
            <p className="text-base text-fontGrey1">
              <span className="font-semibold">Email :</span> {user.emailId}
            </p>
            <p className="text-base text-fontGrey1">
              <span className="font-semibold">Date of birth :</span> {user.dob}
            </p>
            <p className="text-base text-fontGrey1">
              <span className="font-semibold">Designation : </span>{" "}
              {user.designation}
            </p>
            {user &&
              user?.UserInCompany &&
              user?.UserInCompany.map((data: any, index: number) => {
                return (
                  <p key={index} className="text-base text-fontGrey1">
                    {" "}
                    <span className="font-semibold">Company : </span>{" "}
                    {data?.company?.companyName}
                  </p>
                );
              })}
          </div>
        </div>
      </div>

      <PopupVarient1
        open={showDeletePopup}
        setOpen={setShowDeletePopup}
        children={
          <div className="p-4 w-full h-[100px]">
            <p className="w-[500px] text-base font-normal text-fontDark">
              {`Are you sure you want to delete`}{" "}
              <span className="font-medium text-fontError">{`“${user.firstName} ${user.lastName}”`}</span>{" "}
              ?
            </p>
          </div>
        }
        btnChildren={
          <div className="flex gap-4 px-2">
            <PrimaryBtn
              btnSize="sm"
              btnText="Cancel"
              align="center"
              handleClick={() => setShowDeletePopup(false)}
              btnType="button"
              isLoading={false}
              btnDisabled={false}
            />
            <PrimaryBtn
              btnSize="sm"
              btnText="Delete"
              btnColour="fontError"
              align="center"
              handleClick={() => deleteUserMutation.mutate({ id: user.id })}
              btnType="button"
              isLoading={false}
              btnDisabled={false}
            />
          </div>
        }
        handleCloseBlur={() => setShowDeletePopup(false)}
        handleCloseButton={() => setShowDeletePopup(false)}
        header={`Delete “${user.firstName} ${user.lastName}”`}
        topAlign={false}
      />

      <PopupVarient1
        open={showAddToCompanyPopup}
        setOpen={setShowAddToCompany}
        children={<AddUserCompanyForm userData={user.id} />}
        handleCloseBlur={() => setShowAddToCompany(false)}
        handleCloseButton={() => setShowAddToCompany(false)}
        header={`Add “${user.firstName}” to company`}
        topAlign={false}
      />

      <PopupVarient1
        open={migrateUserToCompany}
        setOpen={setMigrateUserToCompany}
        children={<MigrationForm userDetail={user?.UserInCompany} />}
        handleCloseBlur={() => setMigrateUserToCompany(false)}
        handleCloseButton={() => setMigrateUserToCompany(false)}
        header={`Migrate user “${user.firstName} ${user.lastName}”`}
        topAlign={false}
      />

      <PopupVarient1
        open={deactivateUserPopup}
        setOpen={setDeactivateUserPopup}
        children={
          <div className="p-4 w-full h-[100px]">
            <p className="w-[500px] text-base font-normal text-fontDark">
              {`Are you sure you want to ${
                user.active ? "deactivate" : "activate"
              }`}{" "}
              <span
                className={`font-medium ${
                  user.active ? "text-fontError" : "text-green-600"
                }`}
              >{`“${user.firstName} ${user.lastName}”`}</span>{" "}
              ?
            </p>
          </div>
        }
        btnChildren={
          <div className="flex gap-4 px-2">
            <PrimaryBtn
              btnSize="sm"
              btnText="Cancel"
              align="center"
              handleClick={() => setDeactivateUserPopup(false)}
              btnType="button"
              isLoading={false}
              btnDisabled={false}
            />
            <PrimaryBtn
              btnSize="sm"
              btnText={`${user.active ? "Delete" : "Activate"}`}
              btnColour={`${user.active ? "fontError" : "primary"}`}
              align="center"
              handleClick={() =>
                `${
                  user.active
                    ? updateDeactivateUserMutation.mutate({ active: false })
                    : updateDeactivateUserMutation.mutate({ active: true })
                }`
              }
              btnType="button"
              isLoading={false}
              btnDisabled={false}
            />
          </div>
        }
        handleCloseBlur={() => setDeactivateUserPopup(false)}
        handleCloseButton={() => setDeactivateUserPopup(false)}
        header={`${user.active ? "Deactivate" : "Activate"}  “${
          user.firstName
        } ${user.lastName}”`}
        topAlign={false}
      />

      <PopupVarient1
        open={updateUserPopup}
        setOpen={setUpdateUserPopup}
        children={<EditUserForm userData={user} />}
        handleCloseBlur={() => setUpdateUserPopup(false)}
        handleCloseButton={() => setUpdateUserPopup(false)}
        header={`Update user “${user.firstName} ${user.lastName}”`}
        topAlign={false}
      />
    </div>
  );
};

export default UniqueUser;
