import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "About Us", href: "/about", current: false },
  { name: "Solutions", href: "/solutions", current: false },
  { name: "Contact Us", href: "/", current: false, isContact: true },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (item: (typeof navigation)[0]) => {
    if (item.isContact) {
      // Navigate to home page first, then scroll to contact section
      navigate("/");
      setTimeout(() => {
        const contactSection = document.querySelector("#contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Regular navigation
      navigate(item.href);
    }
    setIsOpen(false);
  };

  const isCurrentPage = (item: (typeof navigation)[0]) => {
    // Contact Us should never be highlighted as "current" since it's an action, not a page
    if (item.isContact) {
      return false;
    }
    if (item.href === "/") {
      return location.pathname === "/";
    }
    return location.pathname === item.href;
  };

  return (
    <nav className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => {
                const isCurrent = isCurrentPage(item);
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item)}
                    className={clsx(
                      isCurrent
                        ? "text-primary-500 underline underline-offset-4"
                        : "text-neutral-white hover:text-primary-500 hover:underline hover:underline-offset-4 transform hover:scale-105",
                      "px-2 py-2 transition-all duration-300 ease-out text-sm lg:px-3 lg:text-base text-nowrap"
                    )}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sign In Button */}
          <div className="hidden md:block">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-gray-200 hover:text-neutral-white hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-white"
              aria-expanded={isOpen}
              aria-label="Open main menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background">
            {navigation.map((item) => {
              const isCurrent = isCurrentPage(item);
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  className={clsx(
                    isCurrent
                      ? "bg-secondary-700 text-neutral-white"
                      : "text-neutral-gray-200 hover:bg-secondary-700 hover:text-neutral-white",
                    "block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  )}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {item.name}
                </button>
              );
            })}
            <div className="pt-2">
              <button
                onClick={() => {
                  navigate("/signin");
                  setIsOpen(false);
                }}
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-300 hover:from-primary-700 hover:to-secondary-500 text-neutral-white px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
