import { useEffect, useRef, useState } from "react";
import TerminalIcon from "../assets/terminal.svg";
import UsersIcon from "../assets/users.svg";
import CompaniesIcon from "../assets/companies.svg";

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
  const [isVisible, setIsVisible] = useState(false);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (statRef.current) {
      observer.observe(statRef.current);
    }

    return () => {
      if (statRef.current) {
        observer.unobserve(statRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={statRef}
      className={`text-center transform transition-all duration-700 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-8 opacity-0 scale-95"
      }`}
      style={{
        transitionDelay: `${index * 200}ms`,
      }}
    >
      {/* Icon */}
      <div className="flex justify-center mb-2">
        <div
          className={`w-16 h-16 flex items-center justify-center transform transition-transform duration-500 ${
            isVisible ? "scale-100" : "scale-75"
          }`}
          style={{
            transitionDelay: `${index * 200 + 300}ms`,
          }}
        >
          <img src={stat.icon} alt="Icon" className="w-12" />
        </div>
      </div>

      {/* Percentage */}
      <div className="mb-4">
        <span
          className={`text-5xl lg:text-5xl text-primary-500 transform transition-all duration-600 ${
            isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
          style={{
            transitionDelay: `${index * 200 + 400}ms`,
          }}
        >
          {stat.percentage}
        </span>
      </div>

      {/* Description */}
      <p
        className={`text-base lg:text-xl text-neutral-white leading-relaxed max-w-xs mx-auto transform transition-all duration-500 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{
          transitionDelay: `${index * 200 + 500}ms`,
        }}
      >
        {stat.description}
      </p>
    </div>
  );
};

export const OpenSourceCost = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);
  return (
    <section className="relative bg-background">
      {/* Background decorative border */}
      <div className="absolute inset-4 rounded-lg pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header Section */}
        <div
          ref={headerRef}
          className={`text-center max-w-4xl mx-auto mb-16 transform transition-all duration-700 ease-out ${
            headerVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
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
