import OpenSourceLogo from "../assets/open-source-logo.svg";

export const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 flex items-center space-x-3 hover:scale-105 transition-transform duration-300 ease-out cursor-pointer">
        <div>
          <img
            src={OpenSourceLogo}
            alt="Open Source Economy Logo"
            width="68"
            height="68"
            className="h-12 w-12 transition-transform duration-300 ease-out hover:rotate-12"
          />
        </div>
        <div className="text-neutral-white transition-colors duration-300 hover:text-primary-500">
          <div className="text-lg md:text-xl leading-[1.4]">Open Source</div>
          <div className="text-lg md:text-xl leading-[1.4]">Economy</div>
        </div>
      </div>
    </div>
  );
};
