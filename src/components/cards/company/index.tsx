import React from "react";
import { generateRandomColor } from "../../../utils/randomColourGenerator";
import { Link } from "react-router-dom";
import Modal from "../../modal/companyModal";
import { InitialDelPopupCompany, InitialEditPopupCompany } from "../../../jotai/companies";
import { useAtom } from "jotai";
import PrimaryBtn from "../../button";
import PopupVarient1 from "../../popup";
import { useDeleteCompanyMutation } from "../../../hooks/delete/deleteCompany";
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

  return (
    <div className="border-base border-cardBorder hover:shadow-md cursor-pointer select-none w-[292px] rounded-base overflow-hidden">
      <div className="relative h-[144px]">
        <p className="w-full h-[90px] bg-fontGrey1"></p>
        <Modal companyData={companyData} />

        <p
          style={{ backgroundColor: RandomColour }}
          className={`w-28 h-28 absolute top-8 left-24 rounded-full font-medium text-white flex items-center justify-center text-5xl`}
        >
          {companyName?.split("")[0]}
        </p>
      </div>
      <div className="h-max p-4 flex flex-col gap-2">
        <h1 className="text-lg  font-medium w-full items-center hover:underline hover:text-primary">
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
          <div className="p-4 w-full h-[100px]">
            <p className="w-[500px] text-base font-normal text-fontDark">
              Are you sure you want to delete this company ?
            </p>
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
                deleteCompanyMutation.mutate({ id: companyData.id })
              }
              btnType="button"
              isLoading={false}
              btnDisabled={false}
            />
          </div>
        }
        handleCloseBlur={() => setDeletePopup(false)}
        handleCloseButton={() => setDeletePopup(false)}
        header="Delete Company"
        topAlign={false}
      />

<PopupVarient1
        open={editPopup}
        setOpen={setEditPopup}
        children={
          <EditCompanyForm />
        }
        handleCloseBlur={() => setEditPopup(false)}
        handleCloseButton={() => setEditPopup(false)}
        header="Edit Company"
        topAlign={false}
      />
    </div>
  );
};

export default CompanyCard;
