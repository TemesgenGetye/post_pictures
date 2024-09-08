import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "@/server/db";
import { images } from "@/server/db/schema";
import { use } from "react";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 30 } })
    .middleware(async ({ req }) => {
      const user = auth();
      if (!user.userId) throw new UploadThingError("Unauthorized");

      //some limited requestes

      // const { success } = await ratelimit.limit(user.userId);
      // if (!success) throw new UploadThingError("Too many requests");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.insert(images).values({
        url: file.url,
        thumbnail: file.url,
        name: file.name,
        userId: metadata.userId,
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
