/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { backend } from "../../utils/axiosInstants";
import toast from "react-hot-toast";
import { migrateUser } from "../../config/url";
import { useNavigate, useParams } from "react-router-dom";

export const useMigrateMutation = (): any => {
  const navigate = useNavigate();

  const params = useParams()
  const updateUserMigrateMutation = useMutation(
    async (RequestData: any) => {
      return await backend({
        url: `${migrateUser}/${params.id}`,
        method: "PUT",
        data: RequestData,
      });
    },
    {
      onError: (errors: any) => {
        toast.error(errors.response.data.error);
      },
      onSuccess: () => {
        toast.success("Migrate user success");
        navigate(0);
      },
    }
  );
  return { updateUserMigrateMutation };
};
