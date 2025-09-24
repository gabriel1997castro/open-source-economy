import { useState } from "react";
import { ContactApiService } from "../services/api";
import type { NewsletterData } from "../../../shared/src/types";
import { emailRegex } from "../regex";

interface UseNewsletterSubscriptionReturn {
  email: string;
  setEmail: (email: string) => void;
  isSubscribing: boolean;
  isSuccess: boolean;
  error: string;
  subscribe: () => Promise<void>;
  resetSuccess: () => void;
}

export const useNewsletterSubscription =
  (): UseNewsletterSubscriptionReturn => {
    const [email, setEmail] = useState("");
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const subscribe = async () => {
      if (!email || !emailRegex.test(email.trim())) {
        setError("Please enter a valid email address");
        return;
      }

      setIsSubscribing(true);
      setError("");

      try {
        const newsletterData: NewsletterData = { email: email.trim() };
        const result = await ContactApiService.subscribeToNewsletter(
          newsletterData
        );

        if (result.success) {
          setIsSuccess(true);
          setEmail("");
        } else {
          setError(result.error || "Failed to subscribe. Please try again.");
        }
      } catch {
        setError("Failed to subscribe. Please try again.");
      } finally {
        setIsSubscribing(false);
      }
    };

    const resetSuccess = () => {
      setIsSuccess(false);
    };

    return {
      email,
      setEmail,
      isSubscribing,
      isSuccess,
      error,
      subscribe,
      resetSuccess,
    };
  };
