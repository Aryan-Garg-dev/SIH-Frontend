import { formSections } from "@/constants/registration";
import { atom } from "recoil";

export const formSectionAtom = atom<string>({
  key: "formSectionAtom",
  default: formSections.default as string
})