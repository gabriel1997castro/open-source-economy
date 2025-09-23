import { FooterLogo } from "./FooterLogo";
import { FooterSection } from "./FooterSection";
import { FooterLink } from "./FooterLink";
import { SocialLinks } from "./SocialLinks";
import { NewsletterSubscription } from "../../forms/NewsletterSubscription";

export const Footer = () => {
  return (
    <footer className="bg-background">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2 lg:col-span-2">
            <FooterLogo />
          </div>

          {/* Company Links */}
          <div className="md:col-span-1 lg:col-span-1">
            <FooterSection title="Company">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/mission">Our Mission</FooterLink>
              <FooterLink href="/team">Team</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </FooterSection>
          </div>

          {/* Resources Links */}
          <div className="md:col-span-1 lg:col-span-1">
            <FooterSection title="Resources">
              <FooterLink href="/docs">Documentation</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/guides">Guides</FooterLink>
              <FooterLink href="/api">API Reference</FooterLink>
              <FooterLink href="/support">Support</FooterLink>
            </FooterSection>
          </div>

          {/* Newsletter and Social */}
          <div className="md:col-span-2 lg:col-span-2 flex flex-col space-y-6">
            <div className="md:self-center lg:self-start">
              <SocialLinks />
            </div>
            <NewsletterSubscription />
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div>
        <div className="px-0 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="border-t text-neutral-gray-50"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-neutral-gray-50 text-sm text-center sm:text-left">
              © Open Source Economy - Non profit organisation - CHE-440.058.692
              Switzerland
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
              <FooterLink href="/terms">Terms Of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
