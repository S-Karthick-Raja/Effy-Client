/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import InputLabel from "../../components/input";
import { useForm, SubmitHandler } from "react-hook-form";
import PrimaryBtn from "../../components/button";
import axios from "axios";
import { useUpdateCompanyMutation } from "../../hooks/put/updateCompany";
import AsynCreatableSelectRegBase from "../../components/react-select";
import { useFetchCompanyMutation } from "../../hooks/get/fetchCompany";

type Inputs = {
  companyName: any;
  companyAddress: string;
  latitude: string;
  longitude: string;
};

interface CompanyData {
  id: string;
  companyName: string;
  companyAddress: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
  UserInCompany: Array<[]>;
}

interface CompanyCardProps {
  companyData: CompanyData;
}

const EditCompanyForm: React.FC<CompanyCardProps> = ({
  companyData,
}): React.ReactElement => {
  const { updateCompanyMutation } = useUpdateCompanyMutation();

  const { fetchAllCompanyMutation, company } = useFetchCompanyMutation();

  useEffect(() => {
    fetchAllCompanyMutation.mutate();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      companyName: `${companyData.companyName}`,
      companyAddress: `${companyData.companyAddress}`,
      latitude: `${companyData.latitude}`,
      longitude: `${companyData.longitude}`,
    },
  });

  const filteredObjects = company?.filter(
    (obj: any) => obj.label === companyData.companyName
  );

  console.log(filteredObjects);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const apiKey = "AIzaSyCWsZuRrkZE0EeOjQu-ajyW0utrM-UZ82M";

    const dataSet = {
      companyAddress: `${data.companyAddress}`
    };

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      dataSet.companyAddress
    )}&key=${apiKey}`;

    const response = await axios.get(url);

    const { lat, lng } = response.data.results[0].geometry.location;

    // console.log(filteredObjects[0]?.value)
    // console.log(data?.companyName?.value)
    // let finalCompanyName;

    // if (filteredObjects[0]?.value !== undefined && data?.companyName?.value === undefined) {
    //   finalCompanyName = filteredObjects[0]?.value;
    // } else {
    //   finalCompanyName = data?.companyName;
    // }

    // console.log(finalCompanyName)

    console.log(data)

    console.log(data.companyName)

    if (data.companyName === companyData.companyName) {
      const FinalData = {
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        id: companyData?.id,
        latitude: lat,
        longitude: lng,
      };
  
      console.log("Success");
  
      await updateCompanyMutation.mutate(FinalData);
    }else{
      const FinalData = {
        companyName: data.companyName.value,
        companyAddress: data.companyAddress,
        id: companyData?.id,
        latitude: lat,
        longitude: lng,
      };
  
      console.log("Error");
  
      await updateCompanyMutation.mutate(FinalData);
    }


   
  };

  const [selectCompanyName, setSelecteCompanyName] = useState([]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[600px] min-h-[400px] p-4 flex flex-col justify-between select-none"
    >
      {/* Form Fields */}
      <div className="flex flex-col gap-4">
        <AsynCreatableSelectRegBase
          width="100%"
          setValue={setValue}
          trigger={trigger}
          control={control}
          labelFontSize="sm"
          labelFontWeight="500"
          placeHolder={companyData.companyName}
          label="Company Name"
          listData={company}
          selected={selectCompanyName}
          setSelected={setSelecteCompanyName}
          isError={errors.companyName !== undefined}
          isErrorIcon={true}
          isMandatory={true}
          isInfo={true}
          isMulti={false}
          registerName="companyName"
          getValue={getValues().companyName}
          register={{
            ...register("companyName", {
              required: true,
            }),
          }}
        />
        <InputLabel
          placeHolder="Company Address"
          disabled={false}
          isMandatory={true}
          label="Company Address"
          isError={errors.companyAddress !== undefined}
          inputType="text"
          register={register("companyAddress", {
            required: true,
            minLength: 5,
          })}
        />

        <div className="flex w-full items-center justify-between">
          <div className="w-[47%] flex flex-col gap-1">
            <label className="text-sm font-medium text-fontDark">
              Latitude
            </label>
            <input
              disabled={true}
              className="px-3 py-2 border-base border-cardBorder rounded-sm outline-none focus:border-primary cursor-not-allowed"
              {...register("latitude")}
            />
          </div>
          <div className="w-[47%] flex flex-col gap-1">
            <label className="text-sm font-medium text-fontDark">
              Longitude
            </label>
            <input
              disabled={true}
              className="px-3 py-2 border-base border-cardBorder rounded-sm outline-none focus:border-primary cursor-not-allowed"
              {...register("longitude")}
            />
          </div>
        </div>
      </div>

      {/* Submit Btn */}
      <div className="w-full flex justify-end">
        <PrimaryBtn
          btnDisabled={false}
          btnSize="sm"
          btnText="Update"
          isLoading={false}
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default EditCompanyForm;
