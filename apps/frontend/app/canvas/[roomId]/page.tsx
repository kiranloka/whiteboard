import { RoomCanvas } from "@/components/RoomCanvas";

export default async function Canvas(props: { params: { roomId: string } }) {
  const { roomId } = await props.params;
  return <RoomCanvas roomId={roomId} />;
}
