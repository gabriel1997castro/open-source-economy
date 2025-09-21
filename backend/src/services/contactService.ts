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
          createdAt: new Date(),
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
      const submissions = await prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      });

      return submissions;
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
}
