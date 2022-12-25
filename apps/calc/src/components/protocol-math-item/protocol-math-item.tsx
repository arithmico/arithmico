interface ProtocolMathItemProps {
  input: string;
  output: string;
}

export default function ProtocolMathItem({
  input,
  output,
}: ProtocolMathItemProps) {
  return (
    <li>
      <div className="">{input}</div>
      <div className="flex justify-center">=</div>
      <div>{output}</div>
    </li>
  );
}
