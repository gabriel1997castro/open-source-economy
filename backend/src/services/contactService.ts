import { prisma } from "../lib/prisma";
import { ContactFormData } from "@open-source-economy/shared";

export class ContactService {
  static async createContactSubmission(data: ContactFormData) {
    try {
      const submission = await prisma.contactSubmission.create({
        data: {
          name: data.name,
          email: data.email,
          message: data.message,
          linkedin: data.linkedin || null,
        },
      });

      return submission;
    } catch (error) {
      console.error("Database error creating contact submission:", error);
      throw new Error("Failed to save contact submission");
    }
  }

  static async getContactSubmissions(limit = 50, offset = 0) {
    try {
      const [submissions, total] = await Promise.all([
        prisma.contactSubmission.findMany({
          orderBy: { createdAt: "desc" },
          take: limit,
          skip: offset,
        }),
        prisma.contactSubmission.count(),
      ]);

      return {
        submissions,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      };
    } catch (error) {
      console.error("Database error fetching contact submissions:", error);
      throw new Error("Failed to fetch contact submissions");
    }
  }

  static async getContactSubmissionById(id: number) {
    try {
      const submission = await prisma.contactSubmission.findUnique({
        where: { id },
      });

      return submission;
    } catch (error) {
      console.error("Database error fetching contact submission:", error);
      throw new Error("Failed to fetch contact submission");
    }
  }

  static async deleteContactSubmission(id: number) {
    try {
      const submission = await prisma.contactSubmission.findUnique({
        where: { id },
      });

      if (!submission) {
        throw new Error("Contact submission not found");
      }

      await prisma.contactSubmission.delete({
        where: { id },
      });

      return { id, deleted: true };
    } catch (error) {
      console.error("Database error deleting contact submission:", error);
      if (
        error instanceof Error &&
        error.message === "Contact submission not found"
      ) {
        throw error;
      }
      throw new Error("Failed to delete contact submission");
    }
  }
}
