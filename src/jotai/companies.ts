import { atom } from "jotai";

export const LoadingState = atom(false);
export const InitialDelPopupCompany = atom(false)
export const InitialEditPopupCompany = atom(false)

export const InitialSelectedCompany = atom([])