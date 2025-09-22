import { Button } from "./Button";
import { useContactForm } from "../hooks";

export const ContactForm = () => {
  const {
    formData,
    isSubmitting,
    isSuccess,
    error,
    handleInputChange,
    handleSubmit,
  } = useContactForm();

  return (
    <div
      className="bg-background border border-gray-700 rounded-lg p-8 max-w-md mx-auto"
      style={{
        boxShadow: "0 25px 50px -12px rgba(239, 77, 172, 0.25)",
      }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-neutral-white mb-4">
          Get In Touch
        </h3>
        <p className="text-sm text-neutral-gray-50 leading-relaxed">
          This is so that we can get in contact with you in case any opportunity
          comes up
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm text-neutral-white mb-2"
            >
              Your Full Name<span className="text-primary-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Your Full Name"
              required
              className="w-full px-4 py-3 bg-background border border-gray-600 rounded-lg text-neutral-white placeholder-gray-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-neutral-white mb-2"
            >
              Your Email<span className="text-primary-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 pr-10 bg-background border border-gray-600 rounded-lg text-neutral-white placeholder-gray-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label
            htmlFor="linkedin"
            className="block text-sm text-neutral-white mb-2"
          >
            Your LinkedIn
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            placeholder="Your LinkedIn"
            className="w-full px-4 py-3 bg-background border border-gray-600 rounded-lg text-neutral-white placeholder-gray-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm text-neutral-white mb-2"
          >
            Your Message<span className="text-primary-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Enter your message..."
            required
            rows={4}
            className="w-full px-4 py-3 bg-background border border-gray-600 rounded-lg text-neutral-white placeholder-gray-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-vertical"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {isSuccess && (
            <div className="mb-4 p-3 bg-green-900/20 border border-green-500/50 rounded-lg text-green-300 text-sm">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </div>
  );
};
