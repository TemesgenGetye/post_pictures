import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { getImages } from "~/server/queries";

export const daynamic = "force-dynamic";

export default async function HomePage() {
  const imageURL = await getImages();

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <SignedOut>
        <div className="text-center text-2xl font-semibold">Please signin</div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-wrap justify-start gap-4 py-1">
          {imageURL?.map((image) => (
            <>
              <div
                key={`${image?.id}`}
                className="m-auto flex flex-col items-center justify-center gap-1"
              >
                <Image
                  src={image?.url}
                  alt={`Image ${image?.id}`}
                  className="h-[300px] w-[300px] rounded-lg border border-[#ffd900d4] p-2 shadow-2xl"
                  width={300}
                  height={300}
                  content="cover"
                  priority={true}
                />

                <div className="max-w-[280px] text-start text-lg font-semibold">
                  {image?.name}
                </div>
              </div>
            </>
          ))}
        </div>
      </SignedIn>
    </main>
  );
}
