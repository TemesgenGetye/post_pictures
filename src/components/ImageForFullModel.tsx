import { auth, clerkClient } from "@clerk/nextjs/server";
import { getImageById } from "~/server/queries";

export default async function ImageForFullModel(props: { id: number }) {
  const image = await getImageById(props.id);
  console.log(image);
  const currentUser = await clerkClient.users.getUser(image?.userId);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="m-auto flex h-screen w-3/4 flex-shrink items-center justify-center">
        <img
          src={image?.url}
          alt={image?.name}
          className="flex-shrink object-contain"
        />
      </div>
      <div className="m-auto flex h-full w-[25%] flex-shrink-0 flex-col border-l border-white text-white">
        <div className="w-full border-b p-5 text-center text-xl font-bold">
          {image?.name}
        </div>
        <section className="flex flex-col gap-2 p-5">
          <div className="flex flex-wrap gap-2">
            <span>Uploaded By : </span>
            <span>
              ({currentUser?.firstName} {currentUser?.lastName})
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span>Created On : </span>
            <span>{new Date(image?.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span>Updated On : </span>
            <span>
              <span>{new Date(image?.updatedAt).toLocaleDateString()}</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span> Thumbnail URL : </span>
            <span>
              <span>{image?.thumbnail}</span>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
