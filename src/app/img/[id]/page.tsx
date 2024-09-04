import ImageForFullModel from "~/components/ImageForFullModel";

export default async function PhotoModal({
  params: { id },
}: {
  params: { id: number };
}) {
  console.log("id :", id);
  return <ImageForFullModel id={id} />;
}
