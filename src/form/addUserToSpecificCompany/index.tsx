/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import PrimaryBtn from "../../components/button";
// import { useCreateCompanyMutation } from "../../hooks/post/createCompany";
import AsynDefaultSelectRegBase from "../../components/react-select-default";
import { useAssignUserCompanyMutation } from "../../hooks/post/assignUserToCompany";
import { useGetExistUserMutation } from "../../hooks/get/getAllExistingUser";

type Inputs = {
  userId: any;
};

interface AddUserFormProps {
    companyData: any
}

const AddUserToSpecificCompanyForm: React.FC<AddUserFormProps> = ({companyData}): React.ReactElement => {
  const { assignUserCompanyMutation  } = useAssignUserCompanyMutation()

  const { getAllExistUserMutation, user } = useGetExistUserMutation();
  useEffect(() => {
    getAllExistUserMutation.mutate();
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

//   const options = [
//     { value: "chocolate", label: "Chocolate" },
//     { value: "strawberry", label: "Strawberry" },
//     { value: "vanilla", label: "Vanilla" },
//   ];

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const FinalData = {
        companyId: companyData,
        userId: data.userId.id,
    };
    await assignUserCompanyMutation.mutate(FinalData);
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
          label="Choose user to add"
          listData={user}
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
          Note: user can only assign to one company at a time.
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

export default AddUserToSpecificCompanyForm;
