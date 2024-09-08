"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "@uploadthing/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Spinner from "./Spinner";
import { useEffect } from "react";

export default function Nav() {
  useEffect(() => {
    toast(
      <div className="flex items-center gap-2">
        <Spinner /> Uploading...
      </div>,
      {
        duration: 10000,
      },
    );
  }, []);

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
            appearance={{
              button:
                "color-white bg-black text-white text-lg border border-white p-3 rounded-2xl",
            }}
            onUploadBegin={() => {
              toast(
                <>
                  <Spinner />
                  <span className="ml-2 text-lg">Uploading...</span>
                </>,
                {
                  duration: 10000,
                  id: "upload-begin",
                },
              );
            }}
            onClientUploadComplete={(res: { res: string }) => {
              toast.dismiss("upload-begin");
              toast(<span>Uploaded Complete!</span>, {
                id: "upload-complete",
              });
              router.refresh();
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              toast.error(`Something went wrong! ${error.message}`);
            }}
          />
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}
