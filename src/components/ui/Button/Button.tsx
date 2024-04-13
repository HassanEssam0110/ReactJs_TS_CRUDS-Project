import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}
const Button = ({ children, className, width = "w-full", ...rest }: IProp) => {
  return (
    <button
      className={`${className} ${width} text-white  p-2 font-medium rounded`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
