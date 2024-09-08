import ImageForFullModel from "@/components/ImageForFullModel";

export default async function PhotoModal({
  params: { id },
}: {
  params: { id: number };
}) {
  return <ImageForFullModel id={id} />;
}
