# Animation System Documentation

This project uses a clean, hook-based animation system that separates concerns and promotes reusability.

## 🎯 **Architecture Overview**

### **Custom Hooks**

- `useIntersectionObserver` - Core intersection detection
- `useScrollAnimation` - Individual element animations
- `usePageLoadAnimation` - Page load animations

### **CSS Utilities**

- Keyframe animations in `App.css`
- Utility classes for quick animations
- Accessibility support with `prefers-reduced-motion`

## 🚀 **Quick Start**

### **Basic Scroll Animation**

```tsx
import { useScrollAnimation } from "../hooks";

export const MyComponent = () => {
  const animation = useScrollAnimation({
    animationType: "fadeInUp",
    threshold: 0.3,
    delay: 200,
  });

  return (
    <div
      ref={animation.ref}
      className={animation.className}
      style={animation.style}
    >
      Content that animates on scroll
    </div>
  );
};
```

## 🎨 **Animation Types**

| Type                | Effect                                    | Best For              |
| ------------------- | ----------------------------------------- | --------------------- |
| `fadeInUp`          | Slides up + fade                          | Headers, main content |
| `fadeInLeft`        | Slides from left + fade                   | Step numbers, icons   |
| `fadeInRight`       | Slides from right + fade                  | Descriptions, cards   |
| `scaleIn`           | Scales up + fade                          | Statistics, emphasis  |
| `slideInFromBottom` | Slides up (alias for fadeInUp)            | Content blocks        |
| `slideInFromLeft`   | Slides from left (alias for fadeInLeft)   | Navigation items      |
| `slideInFromRight`  | Slides from right (alias for fadeInRight) | Call-to-actions       |

## ⚙️ **Configuration Options**

### **useScrollAnimation Options**

```tsx
interface UseScrollAnimationOptions {
  threshold?: number; // 0-1, when to trigger (default: 0.2)
  rootMargin?: string; // CSS margin format (default: '0px 0px -50px 0px')
  delay?: number; // Delay in ms (default: 0)
  animationType?: AnimationType; // Animation type (default: 'fadeInUp')
  triggerOnce?: boolean; // Only trigger once (default: true)
}
```

### **Common Configurations**

```tsx
// Early trigger (more aggressive)
const earlyAnimation = useScrollAnimation({
  threshold: 0.1,
  rootMargin: "100px 0px 0px 0px",
});

// Late trigger (more conservative)
const lateAnimation = useScrollAnimation({
  threshold: 0.5,
  rootMargin: "0px",
});

// Repeating animation
const repeatingAnimation = useScrollAnimation({
  triggerOnce: false,
});
```

## 🎭 **Best Practices**

### **Do's ✅**

- Choose appropriate animation types for content
- Test with `prefers-reduced-motion`
- Keep delays reasonable (0-600ms)
- Use semantic animation names

### **Don'ts ❌**

- Don't animate non-interactive elements with hover effects
- Don't use excessive delays (>1000ms)
- Don't ignore accessibility preferences
- Don't mix animation systems (stick to hooks)
- Don't animate too many elements simultaneously

## 🔧 **Advanced Usage**

## ♿ **Accessibility**

The system automatically respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🎯 **Performance**

- Uses IntersectionObserver for efficient scroll detection
- GPU-accelerated transforms (opacity, transform)
- Automatic cleanup prevents memory leaks
- Minimal DOM manipulation

## 📝 **Migration from Manual Implementation**

**Before:**

```tsx
const [isVisible, setIsVisible] = useState(false);
const ref = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(/* ... */);
  // Manual setup...
}, []);

return (
  <div
    ref={ref}
    className={`transition-all ${isVisible ? "opacity-100" : "opacity-0"}`}
  >
    Content
  </div>
);
```

**After:**

```tsx
const animation = useScrollAnimation();

return (
  <div
    ref={animation.ref}
    className={animation.className}
    style={animation.style}
  >
    Content
  </div>
);
```

## 🎬 **Examples**

See `AnimationExamples.tsx` for complete working examples of all animation types and patterns.
