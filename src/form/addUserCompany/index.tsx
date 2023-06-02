/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import PrimaryBtn from "../../components/button";
import AsynDefaultSelectRegBase from "../../components/react-select-default";
import { useGetExistCompanyMutation } from "../../hooks/get/getAllExistingCompany";
import { useAssignUserCompanyMutation } from "../../hooks/post/assignUserToCompany";

type Inputs = {
  companyId: any;
};

interface AddUserFormProps {
  userData: any;
}

const AddUserCompanyForm: React.FC<AddUserFormProps> = ({
  userData,
}): React.ReactElement => {
  const { assignUserCompanyMutation } = useAssignUserCompanyMutation();

  const { getAllExistCompanyMutation, company } = useGetExistCompanyMutation();
  useEffect(() => {
    getAllExistCompanyMutation.mutate();
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
      companyId: data.companyId?.id,
      userId: userData,
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
          placeHolder="ex. search"
          label="Choose company to assign"
          listData={company}
          selected={companyId}
          setSelected={setCompanyId}
          isError={errors.companyId !== undefined}
          isErrorIcon={true}
          isMandatory={false}
          isInfo={true}
          isMulti={false}
          infoText="Skill should max-1"
          registerName="companyId"
          getValue={getValues().companyId}
          register={{
            ...register("companyId", {
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

export default AddUserCompanyForm;
