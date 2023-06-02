/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import PrimaryBtn from "../../components/button";
import AsynDefaultSelectRegBase from "../../components/react-select-default";
import { GetUsersFromCompanyMutation } from "../../hooks/get/getAllUsersFromCompany";
import { useRemoveUserMutation } from "../../hooks/delete/deleteUserFromCompany";

type Inputs = {
    userId: any;
};

interface AddUserFormProps {
  companyData: any;
}

const RemoveUserFromCompanyForm: React.FC<AddUserFormProps> = (): React.ReactElement => {
  const { getAllUsersFromCompanyMutation, users } =
    GetUsersFromCompanyMutation();

   const {removeUserFromCompanyMutation} = useRemoveUserMutation();
  useEffect(() => {
    getAllUsersFromCompanyMutation.mutate();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    getValues,

    control,
    formState: { errors },
  } = useForm<Inputs>();

  const [companyId, setCompanyId] = useState([]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    const FinalData = {
      userId: data?.userId.id,
    };
    await removeUserFromCompanyMutation.mutate(FinalData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[600px] min-h-[400px] p-4 flex flex-col justify-between select-none"
    >
      {/* Form Fields */}
      <div className="flex flex-col gap-4">
        <AsynDefaultSelectRegBase
          width="100%"
          setValue={setValue}
          trigger={trigger}
          control={control}
          labelFontSize="sm"
          labelFontWeight="500"
          placeHolder="ex. john"
          label="Choose user to remove"
          listData={users}
          selected={companyId}
          setSelected={setCompanyId}
          isError={errors.userId !== undefined}
          isErrorIcon={true}
          isMandatory={false}
          isInfo={true}
          isMulti={false}
          registerName="userId"
          getValue={getValues().userId}
          register={{
            ...register("userId", {
              required: true,
            }),
          }}
        />

        <p className="text-sm text-fontGrey2">
          Note: once you remove the user cant't be restore again.
        </p>
      </div>

      {/* Submit Btn */}
      <div className="w-full flex justify-end">
        <PrimaryBtn
          btnDisabled={false}
          btnSize="sm"
          btnText="submit"
          isLoading={false}
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default RemoveUserFromCompanyForm;
