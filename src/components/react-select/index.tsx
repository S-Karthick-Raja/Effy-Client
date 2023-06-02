/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import { Controller } from "react-hook-form";
import classNames from "../../utils/classNames";
import Manditory from "../mandatory";

interface AsynCreatableSelectRegProps {
  label?: string;
  labelFontSize?: string;
  labelFontWeight?: string;
  placeHolder: string;
  width?: string;
  listData: any;
  isError?: boolean;
  isErrorIcon?: boolean;
  isMandatory?: boolean;
  isInfo?: boolean;
  infoText?: string;
  extraInfo?: string;
  isMulti: boolean;
  selected?: any;
  setSelected: React.Dispatch<any>;

  register: object;
  control: any;
  registerName: string;
  setValue: any;
  trigger: any;
  getValue: any;
}

const AsynCreatableSelectRegBase: React.FC<AsynCreatableSelectRegProps> = ({
  label = "",
  labelFontSize = "sm",
  labelFontWeight = "500",
  width = "",
  listData,
  placeHolder,
  isError = false,
  isMandatory = false,
  isMulti,
  setSelected,
  register,
  control,
  registerName = "",
  setValue,
  trigger,
  getValue,
}): React.ReactElement => {
  const SortData = listData.sort((a: any, b: any) =>
    a.label > b.label ? 1 : -1
  );

  const filterColors = (inputValue: string): any => {
    return listData.filter((i: any) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue: string): any =>
    new Promise<[]>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });

  const handleChange = (newValue: any): any => {
    if (isMulti) {
      const finalValue = [...newValue];
      setValue(registerName, finalValue);
    } else {
      setValue(registerName, newValue);
    }

    trigger([registerName]);
    setSelected(newValue);
  };

  return (
    <div
      className={classNames(
        `${label !== "" ? "flex flex-col gap-labelBase" : ""}`
      )}
      style={{ width: `${width}` }}
    >
      <label
        className={classNames(
          `text-sm font-medium select-none text-fontDark flex items-center gap-labelBase`
        )}
      >
        <span className={`text-medium`}>
          {" "}
          {label} {isMandatory && <Manditory fontSize="sm" />}{" "}
        </span>
      </label>

      <div className="flex flex-col gap-2">
        <Controller
          name={registerName}
          control={control}
          defaultValue
          render={({ field }) => (
            <AsyncCreatableSelect
              cacheOptions
              {...field}
              {...register}
              isMulti={isMulti}
              defaultOptions={SortData}
              loadOptions={promiseOptions}
              className="async-select"
              classNamePrefix="async-select-custom-big"
              placeholder={placeHolder}
              noOptionsMessage={() => "No Options Found"}
              aria-invalid={true}
              isSearchable={true}
              isClearable={true}
              isLoading={false}
              value={getValue}
              onChange={handleChange}
              styles={{
                control: (provided) => {
                  return {
                    ...provided,
                    borderColor: isError ? "#D86161" : "#",
                  };
                },
              }}
            />
          )}
        />

        {isError && <p className="text-sm text-fontError font-medium">This is required field</p>}
      </div>
    </div>
  );
};

export default AsynCreatableSelectRegBase;
