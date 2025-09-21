import OpenSourceLogo from "../../public/open-source-logo.svg";

export const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 flex items-center space-x-3">
        <div>
          <img
            src={OpenSourceLogo}
            alt="Open Source Economy Logo"
            className="h-8"
          />
        </div>
        <div className="text-neutral-white">
          <div className="text-lg md:text-xl leading-[1.4]">Open Source</div>
          <div className="text-lg md:text-xl leading-[1.4]">Economy</div>
        </div>
      </div>
    </div>
  );
};
