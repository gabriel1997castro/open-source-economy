import { RiskScoreCard } from "./RiskScoreCard";
import { useScrollAnimation } from "../hooks";

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
  const stepAnimation = useScrollAnimation({
    animationType: "fadeInLeft",
    delay: index * 100,
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  });

  const numberAnimation = useScrollAnimation({
    animationType: "scaleIn",
    delay: index * 200 + 200,
    threshold: 0.3,
  });

  const titleAnimation = useScrollAnimation({
    animationType: "fadeInUp",
    delay: index * 200 + 300,
    threshold: 0.3,
  });

  const descriptionAnimation = useScrollAnimation({
    animationType: "fadeInUp",
    delay: index * 200 + 400,
    threshold: 0.3,
  });

  return (
    <div
      ref={stepAnimation.ref}
      className={`flex gap-6 ${stepAnimation.className}`}
      style={stepAnimation.style}
    >
      {/* Step Number */}
      <div className="flex-shrink-0">
        <span
          ref={numberAnimation.ref}
          className={`text-4xl lg:text-5xl ${step.color} ${numberAnimation.className}`}
          style={numberAnimation.style}
        >
          {step.number}
        </span>
      </div>

      {/* Step Content */}
      <div className="flex-1">
        <h3
          ref={titleAnimation.ref}
          className={`text-4xl lg:text-5xl text-neutral-white mb-4 ${titleAnimation.className}`}
          style={titleAnimation.style}
        >
          {step.title}
        </h3>
        <p
          ref={descriptionAnimation.ref}
          className={`text-base lg:text-lg text-neutral-white leading-relaxed ${descriptionAnimation.className}`}
          style={descriptionAnimation.style}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
};

const AnimatedRiskCard = () => {
  const cardAnimation = useScrollAnimation({
    animationType: "scaleIn",
    delay: 600,
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <div
      ref={cardAnimation.ref}
      className={cardAnimation.className}
      style={cardAnimation.style}
    >
      <RiskScoreCard />
    </div>
  );
};

export const LetUsProtectYou = () => {
  const headerAnimation = useScrollAnimation({
    animationType: "fadeInUp",
    threshold: 0.3,
  });

  return (
    <section className="relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header Section */}
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-12 ${headerAnimation.className}`}
          style={headerAnimation.style}
        >
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
