import { Modal } from "./modal";
import ImageForFullModel from "@/components/ImageForFullModel";

export default async function PhotoModal({
  params: { id },
}: {
  params: { id: number };
}) {
  console.log("id :", id);
  return (
    <Modal>
      <ImageForFullModel id={id} />
    </Modal>
  );
}
