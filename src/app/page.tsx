import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getImages } from "@/server/queries";

export const daynamic = "force-dynamic";

type ImageType = {
  url: string;
  id: number;
  name: string;
  userId: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export default async function HomePage() {
  const imageURL: ImageType[] = await getImages();

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <SignedOut>
        <div className="text-center text-2xl font-semibold">Please signin</div>
      </SignedOut>
      <SignedIn>
        <div className="grid grid-cols-6 gap-4 py-1">
          {imageURL.map((image) => (
            <Link href={`/img/${image.id}`} key={image.id} passHref>
              <div className="m-auto flex flex-col items-center justify-center gap-1">
                <Image
                  src={image.url}
                  alt={`Image ${image.id}`}
                  className="h-[200px] w-[200px] rounded-lg border border-[#ffd900d4] p-2 shadow-2xl"
                  width={200}
                  height={200}
                  priority={true}
                  style={{
                    objectFit: "cover",
                  }}
                />

                <div className="max-w-[280px] text-start text-lg font-semibold">
                  {image.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SignedIn>
    </main>
  );
}
