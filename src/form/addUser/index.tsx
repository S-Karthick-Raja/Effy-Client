/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import InputLabel from "../../components/input";
import { useForm, SubmitHandler } from "react-hook-form";
import PrimaryBtn from "../../components/button";
import { useCreateUserMutation } from "../../hooks/post/createUser";
import AsynCreatableSelectRegBase from "../../components/react-select";
import { useFetchDesignationMutation } from "../../hooks/get/fetchDesignation";
import Manditory from "../../components/mandatory";

type Inputs = {
  firstName: string;
  lastName: string;
  emailId: string;
  designation: any;
  dob: Date;
};

const AddUserForm: React.FC = (): React.ReactElement => {
  const { createUserMutation } = useCreateUserMutation();

  const { fetchAllDesignationMutation, designation } =
    useFetchDesignationMutation();

  useEffect(() => {
    fetchAllDesignationMutation.mutate();
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const FinalData = {
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.emailId,
      designation: data.designation?.value,
      dob: data.dob,
    };
    await createUserMutation.mutate(FinalData);
  };

  const [desig, setDesig] = useState([]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[650px] min-h-[550px] p-4 flex flex-col justify-between select-none"
    >
      {/* Form Fields */}

      <div className="flex flex-col gap-4">
        <div className="flex felx-1 gap-4">
          <InputLabel
            placeHolder="First name"
            disabled={false}
            isMandatory={true}
            label="First Name"
            isError={errors.firstName !== undefined}
            inputType="text"
            register={register("firstName", { required: true, minLength: 3 })}
          />
          <InputLabel
            placeHolder="Last Name"
            disabled={false}
            isMandatory={true}
            label="Last Name"
            isError={errors.lastName !== undefined}
            inputType="text"
            register={register("lastName", {
              required: true,
              minLength: 1,
            })}
          />
        </div>
        <div className="flex flex-1 items-start gap-4">
          <div className="w-[326px]">
            <InputLabel
              placeHolder="ex. Example@domain.com"
              disabled={false}
              isMandatory={true}
              label="Email"
              isError={errors.emailId !== undefined}
              inputType="text"
              register={register("emailId", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address.",
                },
              })}
            />
          </div>

          <div className="flex flex-col gap-1 w-[326px]">
            <label className="text-sm font-normal text-fontDark'">
              Date of birth <Manditory />
            </label>
            <input
              className={`border-base rounded-md  select-none px-3 py-2 cursor-pointer  text-fontDark text-sm h-[37px] ${
                errors.dob !== undefined
                  ? "border-fontError focus:ring-1 hover:border-fontError focus:ring-fontError"
                  : "border-cardBorder hover:border-primary focus:ring-1 focus:ring-primary"
              } `}
              {...register("dob", { required: true })}
              type="date"
              placeholder="Date of Birth"
            />
          </div>
        </div>

        <AsynCreatableSelectRegBase
          width="100%"
          setValue={setValue}
          trigger={trigger}
          control={control}
          labelFontSize="sm"
          labelFontWeight="500"
          placeHolder="ex. Software Developer"
          label="Designation"
          listData={designation}
          selected={desig}
          setSelected={setDesig}
          isError={errors.designation !== undefined}
          isErrorIcon={true}
          isMandatory={true}
          isInfo={true}
          isMulti={false}
          infoText="Skill should max-1"
          registerName="designation"
          getValue={getValues().designation}
          register={{
            ...register("designation", {
              required: true,
            }),
          }}
        />
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

export default AddUserForm;
