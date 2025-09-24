import { prisma } from "../lib/prisma";
import { NewsletterData } from "../../../shared/src/types";

export class NewsletterService {
  static async subscribeToNewsletter(data: NewsletterData) {
    // Check if email already exists
    const existingSubscription = await prisma.newsletterSubscription.findUnique(
      {
        where: { email: data.email },
      }
    );

    if (existingSubscription?.isActive) {
      throw new Error("Email is already subscribed to newsletter");
    }

    if (existingSubscription && !existingSubscription.isActive) {
      // Reactivate subscription
      return await prisma.newsletterSubscription.update({
        where: { email: data.email },
        data: { isActive: true, subscribedAt: new Date() },
      });
    }

    // Create new subscription
    return await prisma.newsletterSubscription.create({
      data: { email: data.email },
    });
  }

  static async getNewsletterSubscriptions(limit = 50, offset = 0) {
    const [subscriptions, total] = await Promise.all([
      prisma.newsletterSubscription.findMany({
        where: { isActive: true },
        orderBy: { subscribedAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.newsletterSubscription.count({
        where: { isActive: true },
      }),
    ]);

    return {
      subscriptions,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    };
  }

  static async deleteNewsletterSubscription(id: number) {
    try {
      const subscription = await prisma.newsletterSubscription.findUnique({
        where: { id },
      });

      if (!subscription) {
        throw new Error("Newsletter subscription not found");
      }

      await prisma.newsletterSubscription.delete({
        where: { id },
      });

      return { id, deleted: true };
    } catch (error) {
      console.error("Database error deleting newsletter subscription:", error);
      if (
        error instanceof Error &&
        error.message === "Newsletter subscription not found"
      ) {
        throw error;
      }
      throw new Error("Failed to delete newsletter subscription");
    }
  }

  static async unsubscribeByEmail(email: string) {
    try {
      const subscription = await prisma.newsletterSubscription.findUnique({
        where: { email },
      });

      if (!subscription) {
        throw new Error("Newsletter subscription not found");
      }

      if (!subscription.isActive) {
        throw new Error("Email is already unsubscribed");
      }

      const updatedSubscription = await prisma.newsletterSubscription.update({
        where: { email },
        data: {
          isActive: false,
        },
      });

      return { email, unsubscribed: true };
    } catch (error) {
      console.error("Database error unsubscribing from newsletter:", error);
      if (
        error instanceof Error &&
        (error.message === "Newsletter subscription not found" ||
          error.message === "Email is already unsubscribed")
      ) {
        throw error;
      }
      throw new Error("Failed to unsubscribe from newsletter");
    }
  }

  static async deleteSubscriptionsByEmails(emails: string[]) {
    try {
      if (!emails || emails.length === 0) {
        return { deletedCount: 0 };
      }

      const deleteResult = await prisma.newsletterSubscription.deleteMany({
        where: {
          email: {
            in: emails,
          },
        },
      });

      return { deletedCount: deleteResult.count };
    } catch (error) {
      console.error("Database error deleting subscriptions by emails:", error);
      throw new Error("Failed to delete subscriptions by emails");
    }
  }

  static async deleteTestSubscriptions() {
    try {
      // Delete all subscriptions with cypress test emails
      const deleteResult = await prisma.newsletterSubscription.deleteMany({
        where: {
          email: {
            contains: "cypress.",
          },
        },
      });

      return { deletedCount: deleteResult.count };
    } catch (error) {
      console.error("Database error deleting test subscriptions:", error);
      throw new Error("Failed to delete test subscriptions");
    }
  }
}
