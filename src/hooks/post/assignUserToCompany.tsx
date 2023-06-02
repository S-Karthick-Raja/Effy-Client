/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { backend } from "../../utils/axiosInstants";
import toast from "react-hot-toast";
import { assignUserToCompany } from "../../config/url";
import { useNavigate } from "react-router-dom";

export const useAssignUserCompanyMutation = (): any => {
  const navigate = useNavigate();
  const assignUserCompanyMutation = useMutation(
    async (RequestData: any) => {
      return await backend({
        url: `${assignUserToCompany}`,
        method: "POST",
        data: RequestData,
      });
    },
    {
      onError: (errors: any) => {
        toast.error(errors.response.data.error);
      },
      onSuccess: (response: any) => {
        toast.success("User assigned to company successfully");
        navigate(0);
      },
    }
  );
  return { assignUserCompanyMutation };
};
