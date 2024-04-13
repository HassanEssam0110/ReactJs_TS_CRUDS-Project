import { InputHTMLAttributes } from "react";
// import { IInput } from "../../../interfaces/IInput";

interface IProp extends InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ ...rest }: IProp) => {
  return (
    <input
      className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-md px-3 py-3"
      {...rest}
    />
  );
};

export default Input;
