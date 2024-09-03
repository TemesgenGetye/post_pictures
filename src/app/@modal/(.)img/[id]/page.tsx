import { getImageById } from "~/server/queries";
import { Modal } from "./modal";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const Id = Number(photoId);
  if (!photoId) {
    return {
      notFound: true,
    };
  }
  const image = await getImageById(Id);

  return (
    <div>
      <img src={image?.url} alt={image?.name} />
    </div>
  );
}
