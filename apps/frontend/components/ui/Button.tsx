import React from "react";
import { cn } from "@/lib/utils"; // optional helper to merge classes

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "default",
  ...props
}) => {
  const baseStyles =
    "font-semibold px-6 py-3 rounded-md transition duration-200";
  const variants = {
    default: "bg-rose-500 hover:bg-rose-600 text-white",
    outline: "border border-gray-300 text-black hover:bg-gray-100",
    ghost: "bg-transparent text-black hover:bg-gray-100",
  };

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
