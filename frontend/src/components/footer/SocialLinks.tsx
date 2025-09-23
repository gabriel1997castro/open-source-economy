import { LinkedInIcon, XTwitterIcon, YouTubeIcon } from "../icons";

interface SocialLinksProps {
  className?: string;
}

export const SocialLinks = ({ className = "" }: SocialLinksProps) => {
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/open-source-economy",
      icon: <LinkedInIcon />,
    },
    {
      name: "X",
      href: "https://x.com/OS_Economy",
      icon: <XTwitterIcon />,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@OpenSourceEconomy-hn3tg",
      icon: <YouTubeIcon />,
    },
  ];

  return (
    <div
      className={`flex justify-center md:justify-start space-x-4 ${className}`}
    >
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-gray-50 hover:text-neutral-white transition-colors"
          aria-label={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};
