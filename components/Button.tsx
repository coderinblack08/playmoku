import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";

const sizes = {
  regular: "py-2 px-6 rounded-lg",
  small: "px-5 py-1.5 rounded-lg",
};

const colors = {
  primary: "text-white bg-red-500 hover:bg-red-400",
  secondary: "text-white bg-gray-800 hover:bg-gray-700",
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof sizes;
  color?: keyof typeof colors;
  icon?: ReactNode;
  transition?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  size = "regular",
  color = "primary",
  icon,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={`${sizes[size]} ${colors[color]} focus:outline-none focus-visible:ring inline-flex items-center justify-center transition ${className}`}
      {...props}
    >
      {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
      <span className="font-semibold">{children}</span>
    </button>
  );
};
