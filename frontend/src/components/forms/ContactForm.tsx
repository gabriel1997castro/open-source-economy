import { Button } from "../ui/Button";
import { ErrorCard } from "../ui/ErrorCard";
import { useContactForm } from "../../hooks";
import { EmailIcon, CheckmarkIcon } from "../icons";

export const ContactForm = () => {
  const {
    formData,
    isSubmitting,
    isSuccess,
    error,
    validationErrors,
    handleInputChange,
    handleSubmit,
    clearError,
  } = useContactForm();

  // Determine error details for ErrorCard
  const getErrorDetails = () => {
    if (!error) return null;

    if (error.includes("connect to server")) {
      return {
        errorCode: "500",
        errorType: "Server Unavailable",
      };
    }

    if (error.includes("Server error occurred")) {
      return {
        errorCode: "500",
        errorType: "Internal Server Error",
      };
    }

    return {
      errorCode: "400",
      errorType: "Request Error",
    };
  };

  const errorDetails = getErrorDetails();

  return (
    <>
      <div className="bg-background border border-gray-700 rounded-lg p-8 max-w-md mx-auto shadow-primary">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-neutral-white mb-4">
            Get In Touch
          </h3>
          <p className="text-sm text-neutral-gray-50 leading-relaxed">
            This is so that we can get in contact with you in case any
            opportunity comes up
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
                Your Full Name<span>*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Your Full Name"
                required
                className="w-full px-4 py-3 bg-input-bg border border-gray-600 rounded-lg text-neutral-white placeholder-gray-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
              />
              {validationErrors.fullName && (
                <p className="mt-1 text-sm text-red-400">
                  {validationErrors.fullName}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-neutral-white mb-2"
              >
                Your Email<span>*</span>
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
                  className="w-full px-4 py-3 pr-10 bg-input-bg border border-gray-600 rounded-lg text-neutral-white placeholder-gray-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <EmailIcon className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-400">
                  {validationErrors.email}
                </p>
              )}
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
              className="w-full px-4 py-3 bg-input-bg border border-gray-600 rounded-lg text-neutral-white placeholder-gray-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
            />
            {validationErrors.linkedin && (
              <p className="mt-1 text-sm text-red-400">
                {validationErrors.linkedin}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm text-neutral-white mb-2"
            >
              Your Message<span>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Enter your message..."
              required
              rows={4}
              className="w-full px-4 py-3 bg-input-bg border border-gray-600 rounded-lg text-neutral-white placeholder-gray-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-vertical"
            />
            {validationErrors.message && (
              <p className="mt-1 text-sm text-red-400">
                {validationErrors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            {isSuccess && (
              <div className="mb-4 p-4 bg-green-900/30 border border-green-500/60 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <CheckmarkIcon className="w-5 h-5 text-green-400 mt-0.5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-green-300 font-medium text-sm mb-1">
                      Message sent successfully!
                    </h4>
                    <p className="text-green-200 text-sm">
                      Thank you for your message! We'll get back to you soon.
                    </p>
                  </div>
                </div>
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

      {/* Error Card Modal */}
      {error && errorDetails && (
        <ErrorCard
          message={error}
          errorCode={errorDetails.errorCode}
          errorType={errorDetails.errorType}
          onRetry={clearError}
          onClose={clearError}
          retryButtonText="Try Again"
        />
      )}
    </>
  );
};
