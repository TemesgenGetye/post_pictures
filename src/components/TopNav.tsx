"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "@uploadthing/react";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  return (
    <div className="flex h-16 items-center justify-between border-b border-gray-300 p-5 py-12 pt-8">
      <div className="text-2xl font-bold">Gallary</div>

      <SignedOut>
        <div className="font rounded-2xl px-5 py-2 text-xl font-bold ring-1 ring-white">
          <SignInButton />
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center space-x-4">
          <UploadButton
            className="mt-6"
            endpoint="imageUploader"
            onClientUploadComplete={(res: { res: string }) => {
              console.log("Upload Completed", res);
              router.refresh();
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}
