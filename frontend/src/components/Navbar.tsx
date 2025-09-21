import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "About Us", href: "#about", current: false },
  { name: "Solutions", href: "#solutions", current: false },
  { name: "Contact Us", href: "#contact", current: false },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <div>
                <img src="favicon.png" alt="Logo" className="h-8" />
              </div>
              <div className="text-neutral-white">
                <div className="text-lg font-semibold leading-tight">
                  Open Source
                </div>
                <div className="text-lg font-semibold leading-tight">
                  Economy
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    item.current === true
                      ? "text-primary-500 underline underline-offset-4"
                      : "text-neutral-white hover:text-primary-500 hover:underline hover:underline-offset-4",
                    "px-3 py-2 text-sm font-medium transition-colors duration-200"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Sign In Button */}
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-primary-500 to-secondary-300 hover:from-primary-700 hover:to-secondary-500 text-neutral-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105">
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-gray-200 hover:text-neutral-white hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-white"
              aria-expanded={isOpen}
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-secondary-900">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={clsx(
                  item.current
                    ? "bg-secondary-700 text-neutral-white"
                    : "text-neutral-gray-200 hover:bg-secondary-700 hover:text-neutral-white",
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                )}
                aria-current={item.current ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-2">
              <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-300 hover:from-primary-700 hover:to-secondary-500 text-neutral-white px-3 py-2 rounded-md text-base font-medium transition-all duration-200">
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
