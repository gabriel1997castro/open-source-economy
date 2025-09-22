import { Button } from "./Button";

interface ErrorCardProps {
  title?: string;
  message: string;
  errorCode?: string | number;
  errorType?: string;
  onRetry?: () => void;
  onClose?: () => void;
  retryButtonText?: string;
  className?: string;
}

export const ErrorCard = ({
  title = "Oops! Something went wrong",
  message,
  errorCode,
  errorType,
  onRetry,
  onClose,
  retryButtonText = "Send Another Message",
  className = "",
}: ErrorCardProps) => {
  return (
    <div className="fixed inset-0 bg-background/98 flex items-center justify-center p-4 z-50 mb-[-40px]">
      <div
        className={`bg-background border border-gray-700 rounded-lg p-8 max-w-md mx-auto relative ${className}`}
        style={{
          boxShadow: "0 25px 50px -12px rgba(239, 77, 172, 0.25)",
        }}
      >
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-neutral-white transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Error Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-700/30 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-neutral-red-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-xl text-neutral-red-900 mb-4">{title}</h3>

          {/* Message */}
          <p className="text-neutral-gray-50 leading-relaxed mb-6">{message}</p>

          {/* Error Details */}
          {(errorCode || errorType) && (
            <div className="bg-[#EF4444]/10 border border-gray-600/40 rounded-lg p-3 mb-6">
              <div className="flex flex-col gap-1 items-center justify-center md:gap-4 text-sm md:flex-row">
                {errorCode && (
                  <span className="text-neutral-red-900">
                    Error Code: {errorCode}
                  </span>
                )}
                {errorType && (
                  <span className="text-neutral-red-900">{errorType}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        {onRetry && (
          <div className="flex justify-center">
            <Button
              onClick={onRetry}
              variant="primary"
              size="lg"
              className="px-8"
            >
              {retryButtonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
