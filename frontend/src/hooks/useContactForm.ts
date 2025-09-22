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
  validationErrors: { [key: string]: string };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  clearError: () => void;
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
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    // Validate required fields
    if (!formData.fullName.trim()) {
      errors.fullName = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long";
    }

    // Validate LinkedIn URL if provided
    if (formData.linkedin.trim() && !/^https?:\/\/.+/.test(formData.linkedin)) {
      errors.linkedin = "Please enter a valid URL";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

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

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

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
    setValidationErrors({});
  };

  const clearError = () => {
    setError(null);
  };

  return {
    formData,
    isSubmitting,
    isSuccess,
    error,
    validationErrors,
    handleInputChange,
    handleSubmit,
    resetForm,
    clearError,
  };
};
