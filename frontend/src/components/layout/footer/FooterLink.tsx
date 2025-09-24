import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface FooterLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
}

export const FooterLink = ({
  href,
  children,
  external = false,
}: FooterLinkProps) => {
  const className =
    "text-neutral-gray-50 hover:text-primary-700 transition-colors text-sm";

  if (
    external ||
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("#")
  ) {
    return (
      <a
        href={href}
        className={className}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
};
