"use click";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Nav() {
  return (
    <div className="flex h-16 items-center justify-between p-4">
      <div className="text-2xl font-bold">Gallary Images</div>

      <SignedOut>
        <div className="font rounded-2xl px-5 py-2 text-xl font-bold ring-1 ring-white">
          <SignInButton />
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
