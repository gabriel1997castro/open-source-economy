import { TerminalIcon, UsersIcon, CompaniesIcon } from "../icons";
import { useScrollAnimation } from "../../hooks";

const statistics = [
  {
    id: 1,
    icon: CompaniesIcon,
    percentage: "90%",
    description: "of companies are using open source projects",
  },
  {
    id: 2,
    icon: TerminalIcon,
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

const AnimatedStatistic = ({
  stat,
  index,
}: {
  stat: (typeof statistics)[0];
  index: number;
}) => {
  const animation = useScrollAnimation({
    delay: index * 200,
    animationType: "scaleIn",
  });

  const IconComponent = stat.icon;

  return (
    <div
      ref={animation.ref}
      className={`text-center ${animation.className}`}
      style={animation.style}
    >
      {/* Icon */}
      <div className="flex justify-center mb-2">
        <div className="w-16 h-16 flex items-center justify-center">
          <IconComponent className="w-12 h-12 text-primary-500" />
        </div>
      </div>

      {/* Percentage */}
      <div className="mb-4">
        <span className="text-5xl lg:text-5xl text-primary-500">
          {stat.percentage}
        </span>
      </div>

      {/* Description */}
      <p className="text-base lg:text-xl text-neutral-white leading-relaxed max-w-xs mx-auto">
        {stat.description}
      </p>
    </div>
  );
};

export const OpenSourceCost = () => {
  const headerAnimation = useScrollAnimation({
    animationType: "fadeInUp",
    threshold: 0.3,
  });
  return (
    <section className="relative bg-background">
      {/* Background decorative border */}
      <div className="absolute inset-4 rounded-lg pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header Section */}
        <div
          ref={headerAnimation.ref}
          className={`text-center max-w-4xl mx-auto mb-16 ${headerAnimation.className}`}
          style={headerAnimation.style}
        >
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {statistics.map((stat, index) => (
            <AnimatedStatistic key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
