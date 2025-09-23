import type { ReactNode } from "react";

interface FooterSectionProps {
  title: string;
  children: ReactNode;
}

export const FooterSection = ({ title, children }: FooterSectionProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-lg font-semibold text-neutral-white">{title}</h3>
      <div className="flex flex-col space-y-3">{children}</div>
    </div>
  );
};
