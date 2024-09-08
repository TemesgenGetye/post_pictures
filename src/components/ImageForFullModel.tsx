import { clerkClient } from "@clerk/nextjs/server";
import { deleteImageById, getImageById } from "@/server/queries";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function ImageForFullModel(props: { id: number }) {
  const isNumber = Number(props.id);
  if (Number.isNaN(isNumber)) {
    throw new Error("Invalid image ID");
  }

  const image = await getImageById(props.id);
  if (!image) {
    throw new Error("Image not found");
  }
  const currentUser = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="m-auto flex h-screen w-3/4 flex-shrink items-center justify-center">
        <img
          src={image.url}
          alt={image.name}
          className="flex-shrink object-contain"
        />
      </div>
      <div className="m-auto flex h-full w-[25%] flex-shrink-0 flex-col border-l border-white text-white">
        <div className="w-full border-b p-5 text-center text-xl font-bold">
          {image.name}
        </div>
        <section className="flex flex-col gap-2 p-5">
          <div className="flex flex-wrap gap-2">
            <span>Uploaded By : </span>
            <span>
              ({currentUser.firstName} {currentUser.lastName})
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span>Created On : </span>
            <span>
              {image.createdAt
                ? new Date(image.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span>Updated On : </span>
            <span>
              <span>
                {image.updatedAt
                  ? new Date(image.updatedAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span> Thumbnail URL : </span>
            <span>
              <span>{image.thumbnail}</span>
            </span>
          </div>
          <div className="p-2">
            <form
              action={async () => {
                "use server";
                await deleteImageById(image.id);
              }}
            >
              <Button variant="destructive" className="w-full" type="submit">
                Delete
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
