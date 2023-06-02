/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { backend } from "../../utils/axiosInstants";
import toast from "react-hot-toast";
import { addUser } from "../../config/url";
import { useNavigate } from "react-router-dom";

export const useCreateUserMutation = (): any => {
  const navigate = useNavigate();
  const createUserMutation = useMutation(
    async (RequestData: any) => {
      return await backend({
        url: `${addUser}`,
        method: "POST",
        data: RequestData,
      });
    },
    {
      onError: (errors: any) => {
        toast.error(errors.response.data.error);
      },
      onSuccess: () => {
        toast.success("Created user successfully");
        navigate(0);
      },
    }
  );
  return { createUserMutation };
};
