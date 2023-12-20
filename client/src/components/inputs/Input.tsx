import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClass?: string;
  label?: string;
}

const Input = ({ containerClass, label, className, ...props }: InputProps) => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
  };

  const inputClasses = twMerge(
    "w-full px-4 py-3 text-sm bg-transparent outline-none border border-outline rounded-lg text-content-1 placeholder:text-content-3 disabled:text-content-disabled disabled:bg-neutral-light",
    className
  );

  return (
    <div className={containerClass}>
      {label ? <label className="block text-sm font-medium text-white mb-2">{label}</label> : null}
      <input
        value={text}
        onChange={handleChange}
        {...props}
        type="text"
        className={inputClasses}
      />
    </div>
  );
};

export default Input;
