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

export const DoYouRemember = () => {
  return (
    <section className="relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header Section */}
        <div className="text-center mb-16">
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
          {impactData.map((impact) => (
            <div key={impact.id} className="text-left">
              {/* Icon & Title */}
              <div className="mb-4">
                <img src={impact.icon} alt={impact.title} />
              </div>
              <div className="flex items-center mb-6">
                <h3
                  className={`text-xl lg:text-5xl leading-tight ${impact.color}`}
                >
                  {impact.title}
                </h3>
              </div>

              {/* Impact Items */}
              <div className="space-y-3">
                {impact.items.map((item, index) => (
                  <p
                    key={index}
                    className="text-sm lg:text-base text-neutral-white"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center">
          <p className="text-lg sm:text-xl text-neutral-gray-50 ">
            Don't let your organization be the next case study.
          </p>
        </div>
      </div>
    </section>
  );
};
