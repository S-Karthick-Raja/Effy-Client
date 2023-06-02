/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { backend } from "../../utils/axiosInstants";
import toast from "react-hot-toast";
import { updateUser } from "../../config/url";
import { useNavigate, useParams } from "react-router-dom";

export const useUserCompanyMutation = (): any => {

  const params = useParams()
  const navigate = useNavigate();
  const updateUserMutation = useMutation(
    async (RequestData: any) => {
      return await backend({
        url: `${updateUser}/${params.id}`,
        method: "PUT",
        data: RequestData,
      });
    },
    {
      onError: (errors: any) => {
        toast.error(errors.response.data.error);
      },
      onSuccess: () => {
        toast.success("Updated user successfully");
        navigate(0);
      },
    }
  );
  return { updateUserMutation };
};
