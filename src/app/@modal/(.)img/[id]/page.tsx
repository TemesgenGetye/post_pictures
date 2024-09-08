import { Modal } from "./modal";
import ImageForFullModel from "@/components/ImageForFullModel";

export default async function PhotoModal({
  params: { id },
}: {
  params: { id: number };
}) {
  return (
    <Modal>
      <ImageForFullModel id={id} />
    </Modal>
  );
}
