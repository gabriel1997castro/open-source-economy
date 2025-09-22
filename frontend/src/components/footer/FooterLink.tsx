import type { ReactNode } from "react";

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
  return (
    <a
      href={href}
      className="text-neutral-gray-50 hover:text-neutral-white transition-colors text-sm"
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
};
