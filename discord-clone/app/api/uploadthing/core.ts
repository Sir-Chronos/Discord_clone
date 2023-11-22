import { auth } from "@clerk/nextjs";
import { error } from "console";
import { use } from "react";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  const userId = auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId: userId };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})
me
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
