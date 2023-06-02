/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment } from "react";
import { generateRandomColor } from "../../../utils/randomColourGenerator";
import { Link } from "react-router-dom";
import {
  InitialDelPopupCompany,
  InitialEditPopupCompany,
  InitialSelectedCompany,
} from "../../../jotai/companies";
import { useAtom } from "jotai";
import PrimaryBtn from "../../button";
import PopupVarient1 from "../../popup";
import { useDeleteCompanyMutation } from "../../../hooks/delete/deleteCompany";
import { Menu, Transition } from "@headlessui/react";
import EditCompanyForm from "../../../form/editCompany";

interface CompanyData {
  id: string;
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

  const [deletePopup, setDeletePopup] = useAtom(InitialDelPopupCompany);
  const [editPopup, setEditPopup] = useAtom(InitialEditPopupCompany);

  const { deleteCompanyMutation } = useDeleteCompanyMutation();

  const [selectedCompany, setSelectedCompany]: any = useAtom(
    InitialSelectedCompany
  );

  return (
    <div className="border-base h-full border-cardBorder hover:shadow-md hover:shadow-cardBorder cursor-pointer select-none w-[292px] rounded-base overflow-hidden">
      <div className="relative h-[144px]">
        <p className="w-full h-[90px] bg-fontGrey1"></p>

        {/* Modal */}
        <Menu as="div" className="relative">
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
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-primary text-white" : "text-gray-900"
                      } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium`}
                      onClick={() => {
                        setEditPopup(true);
                        setSelectedCompany(companyData);
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
                      onClick={() => {
                        setDeletePopup(true);
                        setSelectedCompany(companyData);
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

        <p
          style={{ backgroundColor: RandomColour }}
          className={`w-28 h-28 absolute top-8 left-24 rounded-full font-medium text-white flex items-center justify-center text-5xl`}
        >
          {companyName?.split("")[0].toLocaleUpperCase()}
        </p>
      </div>
      <div className="h-max p-4 flex flex-col gap-2">
        <h1 className="text-lg  font-medium items-center truncate hover:underline capitalize hover:text-primary">
          <Link to={`/company/${companyData.id}`}>{companyName}</Link>
        </h1>
        <Link
          to={`/company/address/${companyData.id}`}
          className="flex items-center gap-1 hover:underline hover:text-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <h1 className="w-full text-sm font-normal items-start truncate">
            {companyAddress}
          </h1>
        </Link>
        <h1 className="text-sm font-medium">
          Employee count :{" "}
          <span className="font-medium text-primary">
            {UserInCompany?.length > 0 ? (
              <>
                {UserInCompany?.length} employee
                {UserInCompany?.length > 1 ? "s" : ""}
              </>
            ) : (
              <span className="text-fontError font-medium">No employees</span>
            )}
          </span>
        </h1>
      </div>

      <PopupVarient1
        open={deletePopup}
        setOpen={setDeletePopup}
        children={
          <div className="p-4 w-full h-[100px] flex flex-col justify-between">
            <p className="w-[500px] text-base font-normal text-fontDark">
              {`Are you sure you want to delete`}{" "}
              <span className="font-medium text-fontError">{`“${selectedCompany.companyName}”`}</span>{" "}
              ?
            </p>
            <span className="text-xs text-fontGrey2">
              Note: All employees from this company will be removed.
            </span>
          </div>
        }
        btnChildren={
          <div className="flex gap-4 px-2">
            <PrimaryBtn
              btnSize="sm"
              btnText="Cancel"
              align="center"
              handleClick={() => setDeletePopup(false)}
              btnType="button"
              isLoading={false}
              btnDisabled={false}
            />
            <PrimaryBtn
              btnSize="sm"
              btnText="Delete"
              btnColour="fontError"
              align="center"
              handleClick={() =>
                deleteCompanyMutation.mutate({ id: selectedCompany.id })
              }
              btnType="button"
              isLoading={false}
              btnDisabled={false}
            />
          </div>
        }
        handleCloseBlur={() => setDeletePopup(false)}
        handleCloseButton={() => setDeletePopup(false)}
        header={`Delete “${selectedCompany.companyName}”`}
        topAlign={false}
      />

      <PopupVarient1
        open={editPopup}
        setOpen={setEditPopup}
        children={<EditCompanyForm companyData={selectedCompany} />}
        handleCloseBlur={() => setEditPopup(false)}
        handleCloseButton={() => setEditPopup(false)}
        header={`Edit “${selectedCompany.companyName}”`}
        topAlign={false}
      />
    </div>
  );
};

export default CompanyCard;
