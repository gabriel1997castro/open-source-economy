import { useScrollAnimation } from "../../hooks";

// Example 1: Simple scroll animation
export const SimpleAnimatedSection = () => {
  const animation = useScrollAnimation({
    animationType: "fadeInUp",
    delay: 0,
    threshold: 0.3,
  });

  return (
    <div
      ref={animation.ref}
      className={`p-8 ${animation.className}`}
      style={animation.style}
    >
      <h2 className="text-2xl font-bold">This section fades in from below</h2>
      <p>Content appears smoothly when scrolled into view</p>
    </div>
  );
};

// Example 3: Different animation types
export const AnimationTypesExample = () => {
  const fadeUp = useScrollAnimation({ animationType: "fadeInUp" });
  const fadeLeft = useScrollAnimation({
    animationType: "fadeInLeft",
    delay: 200,
  });
  const fadeRight = useScrollAnimation({
    animationType: "fadeInRight",
    delay: 400,
  });
  const scaleIn = useScrollAnimation({ animationType: "scaleIn", delay: 600 });

  return (
    <div className="grid grid-cols-2 gap-8 p-8">
      <div
        ref={fadeUp.ref}
        className={`p-6 bg-blue-100 rounded ${fadeUp.className}`}
        style={fadeUp.style}
      >
        <h3>Fade In Up</h3>
        <p>Slides up from below</p>
      </div>

      <div
        ref={fadeLeft.ref}
        className={`p-6 bg-green-100 rounded ${fadeLeft.className}`}
        style={fadeLeft.style}
      >
        <h3>Fade In Left</h3>
        <p>Slides in from left</p>
      </div>

      <div
        ref={fadeRight.ref}
        className={`p-6 bg-yellow-100 rounded ${fadeRight.className}`}
        style={fadeRight.style}
      >
        <h3>Fade In Right</h3>
        <p>Slides in from right</p>
      </div>

      <div
        ref={scaleIn.ref}
        className={`p-6 bg-purple-100 rounded ${scaleIn.className}`}
        style={scaleIn.style}
      >
        <h3>Scale In</h3>
        <p>Scales up from 95%</p>
      </div>
    </div>
  );
};
