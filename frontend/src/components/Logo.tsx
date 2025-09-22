import OpenSourceLogo from "../assets/open-source-logo.svg";

export const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 flex items-center space-x-3 hover:scale-105 transition-transform duration-300 ease-out cursor-pointer">
        <div>
          <img
            src={OpenSourceLogo}
            alt="Open Source Economy Logo"
            className="h-8 transition-transform duration-300 ease-out hover:rotate-12"
          />
        </div>
        <div className="text-neutral-white">
          <div className="text-lg md:text-xl leading-[1.4] transition-colors duration-300 hover:text-primary-500">
            Open Source
          </div>
          <div className="text-lg md:text-xl leading-[1.4] transition-colors duration-300 hover:text-primary-500">
            Economy
          </div>
        </div>
      </div>
    </div>
  );
};
