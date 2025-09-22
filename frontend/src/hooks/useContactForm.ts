import { useState } from "react";
import { ContactApiService } from "../services/api";
import type { ContactFormData } from "@open-source-economy/shared";

// Local form data interface matching the form field names
interface FormData {
  fullName: string;
  email: string;
  linkedin: string;
  message: string;
}

export interface UseContactFormResult {
  formData: FormData;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

export const useContactForm = (): UseContactFormResult => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    linkedin: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);

    try {
      // Map form data to API format (shared types)
      const apiData: ContactFormData = {
        name: formData.fullName,
        email: formData.email,
        linkedin: formData.linkedin || undefined,
        message: formData.message,
      };

      const response = await ContactApiService.submitContactForm(apiData);

      if (response.success) {
        setIsSuccess(true);
        console.log("Form submitted successfully:", response.data);
        // Reset form on success
        setFormData({
          fullName: "",
          email: "",
          linkedin: "",
          message: "",
        });
      } else {
        throw new Error(response.error || "Form submission failed");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      linkedin: "",
      message: "",
    });
    setIsSubmitting(false);
    setIsSuccess(false);
    setError(null);
  };

  return {
    formData,
    isSubmitting,
    isSuccess,
    error,
    handleInputChange,
    handleSubmit,
    resetForm,
  };
};
