import { useEffect, useRef, useState } from "react";
import Decrease from "../assets/decrease.svg";
import Money from "../assets/money.svg";
import Pause from "../assets/pause.svg";

const impactData = [
  {
    id: 1,
    icon: Decrease,
    title: "Reputational Damage",
    color: "text-primary-500",
    items: [
      "Damaged brand reputation.",
      "Consumer trust erosion.",
      "Negative press and public scrutiny.",
    ],
  },
  {
    id: 2,
    icon: Money,
    title: "Financial Devastation",
    color: "text-primary-500",
    items: [
      "$700M+ legal exposure established.",
      "$90,000+ average direct cost per breach.",
      "Massive overtime for 24/7 'war rooms'.",
    ],
  },
  {
    id: 3,
    icon: Pause,
    title: "Operational Paralysis",
    color: "text-primary-500",
    items: [
      "Up to 3,300 developer hours lost.",
      "All innovation halted.",
      "70% recurrence rate forced costly rework cycles.",
    ],
  },
];

const AnimatedImpactCard = ({
  impact,
  index,
}: {
  impact: (typeof impactData)[0];
  index: number;
}) => {
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
      className={`text-left transform transition-all duration-700 ease-out ml-2 ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-8 opacity-0 scale-95"
      }`}
      style={{
        transitionDelay: `${index * 200}ms`,
      }}
    >
      {/* Icon & Title */}
      <div className="mb-4">
        <img
          src={impact.icon}
          alt={impact.title}
          width="48"
          height="48"
          className={`w-12 h-12 transform transition-transform duration-500 ${
            isVisible ? "scale-100" : "scale-75"
          }`}
          style={{
            transitionDelay: `${index * 200 + 300}ms`,
          }}
        />
      </div>
      <div className="flex items-center mb-6">
        <h3
          className={`text-xl lg:text-5xl leading-tight ${
            impact.color
          } transform transition-all duration-600 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
          }`}
          style={{
            transitionDelay: `${index * 200 + 400}ms`,
          }}
        >
          {impact.title}
        </h3>
      </div>

      {/* Impact Items */}
      <div className="space-y-3">
        {impact.items.map((item, itemIndex) => (
          <p
            key={itemIndex}
            className={`text-sm lg:text-base text-neutral-white transform transition-all duration-500 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-6 opacity-0"
            }`}
            style={{
              transitionDelay: `${index * 200 + 500 + itemIndex * 100}ms`,
            }}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export const DoYouRemember = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          headerObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFooterVisible(true);
          footerObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }
    if (footerRef.current) {
      footerObserver.observe(footerRef.current);
    }

    return () => {
      if (headerRef.current) headerObserver.unobserve(headerRef.current);
      if (footerRef.current) footerObserver.unobserve(footerRef.current);
    };
  }, []);
  return (
    <section className="relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header Section */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transform transition-all duration-700 ease-out ${
            headerVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-white mb-8">
            Do You Remember <span className="text-primary-500">Log4Shell</span>?
          </h2>

          <p className="text-base sm:text-lg text-neutral-gray-50 leading-relaxed max-w-4xl mx-auto">
            In December 2021, Log4Shell (CVE-2021-44228) exposed millions of
            Java-based systems worldwide. A single logging library triggered a
            global cybersecurity crisis with catastrophic consequences.
          </p>
        </div>

        {/* Impact Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {impactData.map((impact, index) => (
            <AnimatedImpactCard key={impact.id} impact={impact} index={index} />
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div
          ref={footerRef}
          className={`text-center transform transition-all duration-700 ease-out ${
            footerVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-lg sm:text-xl text-neutral-gray-50 ">
            Don't let your organization be the next case study.
          </p>
        </div>
      </div>
    </section>
  );
};
