import { prisma } from "../lib/prisma";
import { NewsletterData } from "@open-source-economy/shared";

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
}
