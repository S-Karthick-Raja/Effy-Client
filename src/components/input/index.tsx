/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import classNames from "../../utils/classNames";
import Manditory from "../mandatory";

interface InputLabelRegProps {
  label?: string;
  inputType: string;
  placeHolder: string;
  isError?: boolean;
  isMandatory?: boolean;
  disabled?: boolean;
  register: object;
}

const InputLabelReg: React.FC<InputLabelRegProps> = ({
  label = "",
  inputType = "",
  placeHolder,
  isError = true,
  isMandatory = false,
  disabled,
  register,
}): React.ReactElement => {
  return (
    <div
      className={classNames(
        `w-full    ${label !== "" ? "flex flex-col gap-labelBase" : ""}`
      )}
    >
      <label
        className={classNames(
          `text-sm font-medium select-none text-fontDark flex items-center gap-labelBase`
        )}
      >
        <span className={`text-sm`}>
          {" "}
          {label} {isMandatory && <Manditory fontSize="sm" />}{" "}
        </span>
      </label>

      <div className="flex flex-col gap-2">
        <input
          type={inputType}
          disabled={disabled}
          className={classNames(`border-base w-full box-border  disabled:hover:border-cardBorder disabled:cursor-not-allowed
                ${
                  !isError
                    ? "border-cardBorder focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ring-inset hover:border-primary"
                    : "border-fontError focus:border-fontError focus:outline-none focus:ring-1 focus:ring-fontError ring-inset hover:border-fontError"
                }  cursor-pointer text-sm font-normal text-fontDark placeholder:text-fontGrey2 rounded-sm px-btnXsPx py-btnBasePy ring-inset`)}
          placeholder={placeHolder}
          {...register}
        />
        {isError && (
          <span className="text-sm font-medium text-fontError">
            This is required field
          </span>
        )}
      </div>
    </div>
  );
};

export default InputLabelReg;
