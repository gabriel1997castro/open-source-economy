import type {
  ApiResponse,
  ContactFormData,
  ContactSubmissionResponse,
  NewsletterData,
} from "@open-source-economy/shared";
import axios from "axios";

// Configure axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Contact API service
export class ContactApiService {
  /**
   * Submit a contact form
   */
  static async submitContactForm(
    data: ContactFormData
  ): Promise<ApiResponse<ContactSubmissionResponse>> {
    try {
      const response = await api.post<ApiResponse<ContactSubmissionResponse>>(
        "/api/contact",
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle different types of errors
        if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
          return {
            success: false,
            error:
              "Unable to connect to server. Please check your connection and try again.",
          };
        }

        if (error.response?.status === 500) {
          return {
            success: false,
            error: "Server error occurred. Please try again later.",
          };
        }

        return {
          success: false,
          error:
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            "Network error occurred",
        };
      }
      return {
        success: false,
        error: "An unexpected error occurred",
      };
    }
  }

  /**
   * Subscribe to newsletter
   */
  static async subscribeToNewsletter(
    data: NewsletterData
  ): Promise<ApiResponse<{ id: number }>> {
    try {
      const response = await api.post<ApiResponse<{ id: number }>>(
        "/api/newsletter",
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error:
            error.response?.data?.error ||
            error.message ||
            "Network error occurred",
        };
      }
      return {
        success: false,
        error: "An unexpected error occurred",
      };
    }
  }
}
