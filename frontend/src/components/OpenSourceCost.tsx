import {
  BuildingOfficeIcon,
  CodeBracketIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const statistics = [
  {
    id: 1,
    icon: BuildingOfficeIcon,
    percentage: "90%",
    description: "of companies are using open source projects",
  },
  {
    id: 2,
    icon: CodeBracketIcon,
    percentage: "76%",
    description: "of code in codebases is open source",
  },
  {
    id: 3,
    icon: UsersIcon,
    percentage: "60%",
    description: "of maintainers are not paid for their work",
  },
];

export const OpenSourceCost = () => {
  return (
    <section className="relative bg-background">
      {/* Background decorative border */}
      <div className="absolute inset-4 rounded-lg pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-neutral-white mb-8 leading-tight">
            What's The Cost Of Using Open Source Blindly?
          </h1>

          <div className="space-y-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            <p>
              Open source is powerful — but it also opens the door to supply
              chain attacks.
            </p>
            <p>
              Too often, essential libraries are maintained by just a handful of
              volunteers without the resources to keep them secure.
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {statistics.map((stat) => (
            <div
              key={stat.id}
              className="text-center transition-all duration-200 transform hover:scale-105"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center">
                  <stat.icon
                    className="w-12 h-12 text-primary-500"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Percentage */}
              <div className="mb-4">
                <span className="text-5xl lg:text-6xl font-bold text-primary-500">
                  {stat.percentage}
                </span>
              </div>

              {/* Description */}
              <p className="text-base lg:text-xl text-neutral-white leading-relaxed max-w-xs mx-auto">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Section - Log4Shell Reference */}
        {/* <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-7xl font-bold text-neutral-white mb-6">
            Do You Remember <span className="text-primary-500">Log4Shell</span>?
          </h2>

          <p className="text-base sm:text-lg text-neutral-white leading-relaxed max-w-3xl mx-auto">
            In December 2021, Log4Shell (CVE-2021-44228) exposed millions of
            Java-based systems worldwide. A single logging library triggered a
            global cybersecurity crisis with catastrophic consequences.
          </p>
        </div> */}
      </div>
    </section>
  );
};
