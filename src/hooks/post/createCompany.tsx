/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { backend } from "../../utils/axiosInstants";
import toast from "react-hot-toast";
import { addCompany } from "../../config/url";
import { useNavigate } from "react-router-dom";

export const useCreateCompanyMutation = (): any => {
  const navigate = useNavigate();
  const createCompanyMutation = useMutation(
    async (RequestData: any) => {
      return await backend({
        url: `${addCompany}`,
        method: "POST",
        data: RequestData,
      });
    },
    {
      onError: (errors: any) => {
        toast.error(errors.response.data.error);
      },
      onSuccess: () => {
        toast.success("Created jobalert successfully");
        navigate(0);
      },
    }
  );
  return { createCompanyMutation };
};
