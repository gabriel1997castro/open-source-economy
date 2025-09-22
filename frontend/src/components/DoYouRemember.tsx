import Decrease from "../assets/decrease.svg";
import Money from "../assets/money.svg";
import Pause from "../assets/pause.svg";
import { useScrollAnimation } from "../hooks";

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
  const animation = useScrollAnimation({
    animationType: "scaleIn",
    delay: index * 200,
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  const iconAnimation = useScrollAnimation({
    animationType: "scaleIn",
    delay: index * 200 + 300,
    threshold: 0.2,
  });

  const titleAnimation = useScrollAnimation({
    animationType: "fadeInLeft",
    delay: index * 200 + 400,
    threshold: 0.2,
  });

  // Create animations for each item (fixed number based on impact.items length)
  const item1Animation = useScrollAnimation({
    animationType: "fadeInLeft",
    delay: index * 200 + 500,
    threshold: 0.2,
  });

  const item2Animation = useScrollAnimation({
    animationType: "fadeInLeft",
    delay: index * 200 + 600,
    threshold: 0.2,
  });

  const item3Animation = useScrollAnimation({
    animationType: "fadeInLeft",
    delay: index * 200 + 700,
    threshold: 0.2,
  });

  const itemAnimations = [item1Animation, item2Animation, item3Animation];

  return (
    <div
      ref={animation.ref}
      className={`text-left ml-2 ${animation.className}`}
      style={animation.style}
    >
      {/* Icon & Title */}
      <div className="mb-4">
        <img
          src={impact.icon}
          alt={impact.title}
          width="48"
          height="48"
          className={`w-12 h-12 ${iconAnimation.className}`}
          style={iconAnimation.style}
        />
      </div>
      <div className="flex items-center mb-6">
        <h3
          ref={titleAnimation.ref}
          className={`text-xl lg:text-5xl leading-tight ${impact.color} ${titleAnimation.className}`}
          style={titleAnimation.style}
        >
          {impact.title}
        </h3>
      </div>

      {/* Impact Items */}
      <div className="space-y-3">
        {impact.items.map((item, itemIndex) => (
          <p
            key={itemIndex}
            ref={itemAnimations[itemIndex]?.ref}
            className={`text-sm lg:text-base text-neutral-white ${
              itemAnimations[itemIndex]?.className || ""
            }`}
            style={itemAnimations[itemIndex]?.style}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export const DoYouRemember = () => {
  const headerAnimation = useScrollAnimation({
    animationType: "fadeInUp",
    threshold: 0.3,
  });

  const footerAnimation = useScrollAnimation({
    animationType: "fadeInUp",
    threshold: 0.5,
  });

  return (
    <section className="relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header Section */}
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-16 ${headerAnimation.className}`}
          style={headerAnimation.style}
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
          ref={footerAnimation.ref}
          className={`text-center ${footerAnimation.className}`}
          style={footerAnimation.style}
        >
          <p className="text-lg sm:text-xl text-neutral-gray-50 ">
            Don't let your organization be the next case study.
          </p>
        </div>
      </div>
    </section>
  );
};
