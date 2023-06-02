/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, ReactElement } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface PopUpVarient1Props {
    header?: string;
    open: any;
    setOpen: any;
    children: any;
    btnChildren?: ReactElement;
    topAlign: boolean;
    handleCloseButton: () => void;
    handleCloseBlur: () => void;
}

const PopupVarient1: React.FC<PopUpVarient1Props> = ({
    header,
    open,
    children,
    btnChildren,
    topAlign = false,
    handleCloseButton,
    handleCloseBlur,
}): React.ReactElement => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50 general-popup"
                onClose={handleCloseBlur}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-fontGrey1 bg-opacity-60 transition-opacity" />
                </Transition.Child>

                <div
                    className={`fixed inset-0 ${
                        topAlign ? 'top-[30px]' : 'top-0'
                    }  z-10 overflow-y-auto `}
                >
                    <div
                        className={`flex min-h-full text-center ${
                            topAlign ? 'sm:items-start' : 'sm:items-center'
                        } sm:p-0`}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className={`relative max-w-fit transform overflow-hidden rounded-base bg-white text-left shadow-xl transition-all sm:w-full  lg:mx-auto`}
                            >
                                {header !== '' ? (
                                    <div className="flex items-center justify-between p-4 bg-headingBackground select-none">
                                        <p className="text-lg font-medium text-fontDark">
                                            {header}
                                        </p>

                                        <button
                                            type="button"
                                            className="flex items-center justify-center hover:bg-fontGrey1 [&>*:nth-child(odd)]:hover:text-white active:bg-headingBackground [&>*:nth-child(odd)]:active:text-fontGrey1 w-7 h-7 rounded-full"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-fontGrey1 cursor-pointer"
                                                onClick={handleCloseButton}
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    ' '
                                )}
                                <div className="lg:max-w-full max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-cardBorder scrollbar-corner-black scrollbar-thumb-fontGrey2 scroll-smooth ">
                                    {children}
                                </div>

                                {btnChildren != null ? (
                                    <div className="flex items-center px-btnBasePx pt-2 pb-btnBasePx justify-end border-t-[1px]">
                                        {btnChildren}
                                    </div>
                                ) : (
                                    ''
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default PopupVarient1;
