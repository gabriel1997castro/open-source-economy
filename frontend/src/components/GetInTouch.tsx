import { ContactForm } from "./ContactForm";
import { useScrollAnimation } from "../hooks";

export const GetInTouch = () => {
  const headerAnimation = useScrollAnimation({
    animationType: "fadeInUp",
    threshold: 0.3,
  });

  const descriptionAnimation = useScrollAnimation({
    animationType: "fadeInUp",
    delay: 200,
    threshold: 0.3,
  });

  const formAnimation = useScrollAnimation({
    animationType: "scaleIn",
    delay: 400,
    threshold: 0.2,
  });

  return (
    <section className="relative bg-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2
            ref={headerAnimation.ref}
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-white mb-8 ${headerAnimation.className}`}
            style={headerAnimation.style}
          >
            Don't Wait For The Next Breach
          </h2>

          <p
            ref={descriptionAnimation.ref}
            className={`text-base sm:text-lg text-neutral-gray-50 leading-relaxed max-w-4xl mx-auto ${descriptionAnimation.className}`}
            style={descriptionAnimation.style}
          >
            We're here to support your business. Whether you want to learn more
            about our services, explore collaboration opportunities, or need
            guidance, our team is ready to help you strengthen your open source
            security.
          </p>
        </div>

        {/* Contact Form */}
        <div
          ref={formAnimation.ref}
          className={formAnimation.className}
          style={formAnimation.style}
        >
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
