import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { clsx } from "clsx";
import { LoadingSpinnerIcon } from "../icons";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}

const buttonVariants = {
  primary: "bg-gradient-brand hover:bg-gradient-brand-hover text-neutral-white",
  secondary: "bg-secondary-700 hover:bg-secondary-500 text-neutral-white",
  outline:
    "border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-neutral-white",
  ghost: "text-primary-500 hover:bg-primary-500/10",
};

const buttonSizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2 text-sm",
  lg: "px-8 py-3 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled,
  icon,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        // Base styles with enhanced animations
        "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none",
        // Variant styles
        buttonVariants[variant],
        // Size styles
        buttonSizes[size],
        // Full width
        fullWidth && "w-full",
        // Loading state
        loading && "cursor-wait",
        // Custom className
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinnerIcon className="-ml-1 mr-2 h-4 w-4" />}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
