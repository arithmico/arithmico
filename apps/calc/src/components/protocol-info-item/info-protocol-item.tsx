export default function ProtocolInfoItem({ message }: { message: string }) {
  return (
    <li>
      <span>[info]</span>
      <span></span>
      <span>{message}</span>
    </li>
  );
}
