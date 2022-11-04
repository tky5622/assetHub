import { atom } from "recoil";

export const LensSignupModalAtoms = atom({
  key: "create_notepad",
  default: [
    {
      id: "1",
      value: "Please Type this.",
    },
  ],
});
