import prisma from "@/lib/prisma";

export async function safeResumeCount(userId: string): Promise<number> {
  try {
    return await prisma.resume.count({ where: { userId } });
  } catch (error) {
    console.warn(
      "[db] Failed to count resumes; returning 0. " +
        "This usually means DATABASE_URL is unreachable.",
      error,
    );
    return 0;
  }
}
