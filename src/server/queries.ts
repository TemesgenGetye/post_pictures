import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";

export async function getImages() {
  try {
    const user = auth();

    if (!user.userId) {
      throw new Error("User not authenticated");
    }

    const imageURL = await db.query.images.findMany({
      where: (images, { eq }) => eq(images.userId, user.userId),
      columns: {
        id: true,
        name: true,
        url: true,
      },
      orderBy: (images, { desc }) => [desc(images.id)],
    });

    return imageURL;
  } catch (error) {
    console.error("Failed to fetch images:", error);
    throw new Error("Failed to fetch images");
  }
}
