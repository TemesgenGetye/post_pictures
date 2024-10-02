import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { toast } from "sonner";

export async function getImages() {
  try {
    const user = auth();

    if (!user.userId) {
      throw new Error("User not authenticated");
    }

    const imageURL = await db.query.images.findMany({
      where: (images, { eq }) => eq(images.userId, user.userId),

      orderBy: (images, { desc }) => [desc(images.id)],
    });

    return imageURL;
  } catch (error) {
    console.error("Failed to fetch images:", error);
  }
}

export async function getImageById(id: number) {
  try {
    const user = auth();
    if (!user.userId) {
      throw new Error("User not authenticated");
    }
    const image = await db.query.images.findFirst({
      where: (images, { eq }) => eq(images.id, id),
    });
    return image;
  } catch (error) {
    console.error("Failed to fetch image:", error);
    throw new Error("Failed to fetch image");
  }
}

export async function deleteImageById(id: number) {
  try {
    const user = auth();
    if (!user.userId) {
      throw new Error("User not authenticated");
    }
    await db
      .delete(images)
      .where(and(eq(images.id, id), eq(images.userId, user.userId)));
    toast.success("Image deleted successfully");
  } catch (error) {
    console.error("Failed to delete image:", error);
  }
  revalidatePath("/");
  redirect("/");
}
