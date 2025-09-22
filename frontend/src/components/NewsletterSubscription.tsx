import { useState } from "react";
import { Button } from "./Button";

export const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);
    setError("");

    try {
      // TODO: Integrate with newsletter API using ContactApiService
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setIsSuccess(true);
      setEmail("");
    } catch {
      setError("Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg text-neutral-white">Newsletter</h3>
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <p className="text-green-400 text-sm">
            ✓ Successfully subscribed to our newsletter!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-1">
      <h3 className="text-lg text-neutral-white">Newsletter</h3>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-background border border-gray-600 rounded-lg overflow-hidden focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-colors">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="flex-1 px-4 py-3 bg-transparent text-neutral-white placeholder-gray-300 focus:outline-none text-sm"
            disabled={isSubscribing}
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSubscribing}
            className="m-1 rounded-lg px-6"
          >
            {isSubscribing ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>
        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
      </form>
    </div>
  );
};
