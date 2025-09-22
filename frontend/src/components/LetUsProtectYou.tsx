import { useEffect, useRef, useState } from "react";
import { RiskScoreCard } from "./RiskScoreCard";

const steps = [
  {
    id: 1,
    number: "01",
    title: "We Analyze",
    description:
      "We score your open source dependencies, measuring community strength, maintainer expertise, and supply chain integrity.",
    color: "text-primary-300",
  },
  {
    id: 2,
    number: "02",
    title: "We Alert",
    description:
      "We send actionable, real-time alerts—detecting hidden risks, mapping CVEs, and clarifying exploitability with VEX to eliminate false positives.",
    color: "text-primary-300",
  },
  {
    id: 3,
    number: "03",
    title: "We Partner",
    description:
      "For your most critical dependencies, we provide direct support, collaborating with maintainers, hardening projects, and ensuring long-term security and sustainability.",
    color: "text-primary-300",
  },
];

const AnimatedStep = ({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={stepRef}
      className={`flex gap-6 transform transition-all duration-700 ease-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
      }`}
      style={{
        transitionDelay: `${index * 200}ms`,
      }}
    >
      {/* Step Number */}
      <div className="flex-shrink-0">
        <span
          className={`text-4xl lg:text-5xl ${
            step.color
          } transform transition-transform duration-500 ${
            isVisible ? "scale-100" : "scale-75"
          }`}
          style={{
            transitionDelay: `${index * 200 + 200}ms`,
          }}
        >
          {step.number}
        </span>
      </div>

      {/* Step Content */}
      <div className="flex-1">
        <h3
          className={`text-4xl lg:text-5xl text-neutral-white mb-4 transform transition-all duration-600 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{
            transitionDelay: `${index * 200 + 300}ms`,
          }}
        >
          {step.title}
        </h3>
        <p
          className={`text-base lg:text-lg text-neutral-white leading-relaxed transform transition-all duration-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{
            transitionDelay: `${index * 200 + 400}ms`,
          }}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
};

const AnimatedRiskCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-12 opacity-0 scale-95"
      }`}
      style={{
        transitionDelay: "600ms",
      }}
    >
      <RiskScoreCard />
    </div>
  );
};

export const LetUsProtectYou = () => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header Section */}
        <div
          ref={headerRef}
          className={`text-center mb-12 transform transition-all duration-700 ease-out ${
            headerVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-base sm:text-lg text-neutral-gray-200 mb-6 max-w-2xl mx-auto">
            Don't let your organization be the next case study.
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-white mb-16">
            Let Us Protect You
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <AnimatedStep key={step.id} step={step} index={index} />
            ))}
          </div>

          <AnimatedRiskCard />
        </div>
      </div>
    </section>
  );
};
