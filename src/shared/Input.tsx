import React from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ ...props }: InputProps) => {
  return <input {...props} className="border p-2 rounded" />;
};

export default Input;
