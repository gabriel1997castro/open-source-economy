import { Logo } from "../Logo";

export const FooterLogo = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-3">
        <Logo />
        <div></div>
      </div>
      <p className="text-neutral-gray-50 text-sm max-w-md leading-relaxed">
        Open Source Economy is a non-profit organization dedicated to helping
        developers keep contributing to open source while receiving funding for
        their projects.
      </p>
    </div>
  );
};
