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

export const LetUsProtectYou = () => {
  return (
    <section className="relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header Section */}
        <div className="text-center mb-12">
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
            {steps.map((step) => (
              <div key={step.id} className="flex gap-6">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <span className={`text-4xl lg:text-5xl ${step.color}`}>
                    {step.number}
                  </span>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <h3 className="text-4xl lg:text-5xl  text-neutral-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-base lg:text-lg text-neutral-white leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <RiskScoreCard />
        </div>
      </div>
    </section>
  );
};
