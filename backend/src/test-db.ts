// backend/src/test-db.ts
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully!");

    // Test creating a contact submission
    // const test = await prisma.contactSubmission.create({
    //   data: {
    //     name: "Test User",
    //     email: "test@example.com",
    //     message: "Test message"
    //   }
    // })
    // console.log('Test submission:', test)
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
