import RiskScoreImg from "../assets/risk-score.svg";
import PeopleIcon from "../assets/people.svg";
import ShieldIcon from "../assets/shield.svg";
import LinkIcon from "../assets/link.svg";

const riskData = {
  score: 56,
  level: "Medium Risk",
  whyThisScoreMatters: [
    "Supply chain attacks increased 650% in 2022",
    "70% of vulnerabilities are in dependencies, not your code",
    "Medium risk dependencies need active monitoring",
  ],
  whatWeAnalyze: [
    { label: "Community Health", icon: PeopleIcon },
    { label: "Security Practices", icon: ShieldIcon },
    { label: "Supply Chain Integrity", icon: LinkIcon },
  ],
};

export const RiskScoreCard = () => {
  return (
    <div className="flex justify-center lg:justify-end">
      <div className="w-full max-w-md">
        <div className="bg-background border border-gray-700 rounded-lg p-6 space-y-6 py-12">
          {/* Header */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-neutral-white">RISK SCORE</h3>
          </div>

          <div className="flex justify-center">
            <div className="relative w-56 h-56">
              <img 
                src={RiskScoreImg} 
                alt="Risk Score" 
                width="224"
                height="224"
                className="w-56 h-56" 
              />
            </div>
          </div>
          {/* Why This Score Matters */}
          <div className="mt-[-3rem]">
            <h4 className="text-sm font-bold text-neutral-white mb-3">
              Why This Score Matters
            </h4>
            <div className="space-y-2">
              {riskData.whyThisScoreMatters.map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-xs text-neutral-white leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* What We Analyze */}
          <div>
            <h4 className="text-sm font-bold text-neutral-white mb-3">
              What We Analyze
            </h4>
            <div className="space-y-2">
              {riskData.whatWeAnalyze.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img 
                    src={item.icon} 
                    alt={item.label} 
                    width="16"
                    height="16"
                    className="w-4 h-4" 
                  />
                  <p className="text-xs text-neutral-white">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
