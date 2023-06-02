/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { backend } from "../../utils/axiosInstants";
import toast from "react-hot-toast";
import { deactivateUser } from "../../config/url";
import { useNavigate, useParams } from "react-router-dom";

export const useDeActivateUserMutation = (): any => {
  const navigate = useNavigate();

  const params = useParams();
  const updateDeactivateUserMutation = useMutation(
    async (RequestData: any) => {
      return await backend({
        url: `${deactivateUser}/${params.id}`,
        method: "PUT",
        data: RequestData,
      });
    },
    {
      onError: (errors: any) => {
        toast.error(errors.response.data.error);
      },
      onSuccess: () => {
        toast.success("Deactivated user success");
        navigate(0);
      },
    }
  );
  return { updateDeactivateUserMutation };
};
