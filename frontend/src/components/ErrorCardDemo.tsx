import { useState } from "react";
import { ErrorCard } from "./ErrorCard";
import { Button } from "./Button";

export const ErrorCardDemo = () => {
  const [showError, setShowError] = useState(false);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-neutral-white mb-4">
        ErrorCard Demo
      </h2>

      <Button onClick={() => setShowError(true)} variant="primary">
        Show Error Card
      </Button>

      {showError && (
        <ErrorCard
          title="Oops! Something went wrong"
          message="We couldn't process your request at the moment. Please check your connection and try again later."
          errorCode="500"
          errorType="Server Unavailable"
          onRetry={() => {
            console.log("Retrying...");
            setShowError(false);
          }}
          onClose={() => setShowError(false)}
          retryButtonText="Send Another Message"
        />
      )}
    </div>
  );
};
