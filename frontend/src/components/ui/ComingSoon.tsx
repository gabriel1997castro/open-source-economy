import { useScrollAnimation } from "../../hooks";

interface ComingSoonProps {
  title: string;
  description?: string;
  expectedDate?: string;
}

export const ComingSoon = ({ 
  title, 
  description = "We're working hard to bring you something amazing.", 
  expectedDate 
}: ComingSoonProps) => {
  const headerAnimation = useScrollAnimation({
    animationType: "fadeInUp",
    threshold: 0.3,
  });

  const descriptionAnimation = useScrollAnimation({
    animationType: "fadeInUp",
    delay: 200,
    threshold: 0.3,
  });

  const iconAnimation = useScrollAnimation({
    animationType: "scaleIn",
    delay: 400,
    threshold: 0.3,
  });

  const dateAnimation = useScrollAnimation({
    animationType: "fadeInUp",
    delay: 600,
    threshold: 0.3,
  });

  return (
    <section className="relative bg-background min-h-[80vh] flex items-center justify-center py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Icon */}
        <div
          ref={iconAnimation.ref}
          className={`mb-8 ${iconAnimation.className}`}
          style={iconAnimation.style}
        >
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-300 rounded-full flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-neutral-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1
          ref={headerAnimation.ref}
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-white mb-6 ${headerAnimation.className}`}
          style={headerAnimation.style}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          ref={descriptionAnimation.ref}
          className={`text-lg sm:text-xl text-neutral-gray-50 leading-relaxed mb-8 max-w-2xl mx-auto ${descriptionAnimation.className}`}
          style={descriptionAnimation.style}
        >
          {description}
        </p>

        {/* Expected Date */}
        {expectedDate && (
          <div
            ref={dateAnimation.ref}
            className={`inline-flex items-center px-6 py-3 bg-secondary-900 rounded-lg ${dateAnimation.className}`}
            style={dateAnimation.style}
          >
            <svg 
              className="w-5 h-5 text-primary-500 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span className="text-neutral-white font-medium">
              Expected: {expectedDate}
            </span>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-primary-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-secondary-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </section>
  );
};