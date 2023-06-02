import { Menu, Transition } from "@headlessui/react";
import { useAtom } from "jotai";
import { Fragment } from "react";
import {
  InitialDelPopupCompany,
  InitialEditPopupCompany,
} from "../../../jotai/companies";

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

const UserModal: React.FC<CompanyCardProps> = ({
  companyData,
}): React.ReactElement => {

  const [deletePopup, setDeletePopup] = useAtom(InitialDelPopupCompany);
  const [editPopup, setEditPopup] = useAtom(InitialEditPopupCompany);

  return (
    <div className="w-full">
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
                    onClick={() => console.log(companyData.id)}
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
                    Add People
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary text-white" : "text-gray-900"
                    } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium`}
                    onClick={() => setEditPopup(true)}
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
                    onClick={() => setDeletePopup(true)}
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
  );
};

export default UserModal;
