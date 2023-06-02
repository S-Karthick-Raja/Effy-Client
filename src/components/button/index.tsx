/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { ReactElement } from "react";
import classNames from "../../utils/classNames";

interface PrimaryCTABtnProps {
  width?: string;
  btnText: string;
  btnSize: string;
  btnType: "button" | "submit" | "reset";
  btnDisabled: boolean;
  isLoading: boolean;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  align?: "center" | "left" | "right";
  handleClick?: () => void;
  btnColour?: 'primary' | 'fontError';
}

const PrimaryBtn: React.FC<PrimaryCTABtnProps> = ({
  align,
  width,
  btnText,
  btnSize,
  btnType,
  btnDisabled,
  isLoading,
  leftIcon,
  rightIcon,
  btnColour='primary',
  handleClick,
}): React.ReactElement => {

  return (
    <button
      type={btnType}
      className={classNames(`${btnColour === 'primary' ? 'bg-primary hover:bg-secondary focus:ring-secondary' : 'bg-fontError hover:bg-red-600 focus:ring-fontError'}  text-white font-medium rounded-sm  disabled:hover:bg-expired
                 box-border disabled:text-fontGrey2 disabled:bg-expired disabled:cursor-not-allowed active:bg-active
                focus:outline-none focus:ring-[1px]  focus:ring-offset-[1px]
            ${btnSize === "xs" && "lg:px-btnXsPx lg:py-btnXsPy lg:text-xs "}
            ${btnSize === "sm" && "lg:px-btnSmPx lg:py-btnSmPy lg:text-sm "}
            ${
              btnSize === "base" &&
              "lg:px-btnBasePx lg:py-btnBasePy lg:text-sm "
            }
            ${btnSize === "lg" && "lg:px-btnLgPx lg:py-btnLgPy lg:text-base "}
            ${btnSize === "xl" && "lg:px-btnXlPx lg:py-btnXlPy lg:text-base "}
            ${isLoading && "bg-secondary/80 cursor-progress"} 
            ${
              width === "full"
                ? "w-full flex items-center justify-center"
                : "w-fit"
            }
            ${align === "center" ? "m-auto" : ""}
            ${align === "right" ? "ml-auto" : ""}
            ${align === "left" ? "mr-auto" : ""}       
            `)}
      onClick={handleClick}
      disabled={btnDisabled}
    >
      {isLoading ? (
        <>Loading...</>
      ) : (
        <span className="flex items-center gap-2">
          {leftIcon} {btnText} {rightIcon}
        </span>
      )}
    </button>
  );
};

export default PrimaryBtn;
