/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { backend } from "../../utils/axiosInstants";
import toast from "react-hot-toast";
import { updateCompany } from "../../config/url";
import { useNavigate } from "react-router-dom";

export const useUpdateCompanyMutation = (): any => {
  const navigate = useNavigate();
  const updateCompanyMutation = useMutation(
    async (RequestData: any) => {
      return await backend({
        url: `${updateCompany}/${RequestData.id}`,
        method: "PUT",
        data: RequestData,
      });
    },
    {
      onError: (errors: any) => {
        toast.error(errors.response.data.error);
      },
      onSuccess: () => {
        toast.success("Updated company successfully");
        navigate(0);
      },
    }
  );
  return { updateCompanyMutation };
};
