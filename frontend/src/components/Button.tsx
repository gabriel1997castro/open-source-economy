import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

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
        // Base styles
        "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
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
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
