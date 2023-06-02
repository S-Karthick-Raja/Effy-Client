/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import InputLabel from "../../components/input";
import { useForm, SubmitHandler } from "react-hook-form";
import PrimaryBtn from "../../components/button";
import axios from "axios";
import { useCreateCompanyMutation } from "../../hooks/post/createCompany";
import AsynCreatableSelectRegBase from "../../components/react-select";
import { useFetchCompanyMutation } from "../../hooks/get/fetchCompany";

type Inputs = {
  companyName: any;
  companyAddress: string;
};

const AddCompanyForm: React.FC = (): React.ReactElement => {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const { createCompanyMutation } = useCreateCompanyMutation();

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
  } = useForm<Inputs>();

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

    console.log(response.data.results);

    console.log(lat,lng)

    const FinalData = {
      companyName: data.companyName?.label,
      companyAddress: data.companyAddress,
      latitude: lat,
      longitude: lng,
    };

    setLatitude(lat);
    setLongitude(lng);

    console.log(FinalData)

    await createCompanyMutation.mutate(FinalData);
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
          labelFontWeight="medium"
          placeHolder="ex. effy"
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
            <p className="h-[38px] px-3 py-2 border-base border-cardBorder rounded-sm text-sm cursor-not-allowed ">
              {latitude === null ? (
                <span className="text-fontGrey2">
                  Latitude based on address
                </span>
              ) : (
                latitude
              )}
            </p>
          </div>
          <div className="w-[47%] flex flex-col gap-1">
            <label className="text-sm font-medium text-fontDark">
              Longitude
            </label>
            <p className="h-[38px] px-3 py-2 border-base border-cardBorder rounded-sm text-sm cursor-not-allowed ">
              {longitude === null ? (
                <span className="text-fontGrey2">
                  Longitude based on address
                </span>
              ) : (
                longitude
              )}
            </p>
          </div>
        </div>
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

export default AddCompanyForm;
