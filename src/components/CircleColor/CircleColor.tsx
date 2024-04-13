import { HTMLAttributes } from "react";

interface IProp extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}
const CircleColor = ({ color, ...rest }: IProp) => {
  return (
    <span
      className="block w-5 h-5 rounded-full cursor-pointer mb-1"
      style={{ backgroundColor: color }}
      {...rest}
    ></span>
  ); 
};

export default CircleColor;
