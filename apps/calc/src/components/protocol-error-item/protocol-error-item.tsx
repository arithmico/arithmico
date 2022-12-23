import classNames from "classnames";

interface ProtocolErrorItemProps {
  input: string;
  output: string;
}

export default function ProtocolErrorItem({
  input,
  output,
}: ProtocolErrorItemProps) {
  return (
    <li
      className={classNames("theme-dark:bg-red-900", "theme-light:bg-red-200")}
    >
      <span>{input}</span>
      <div className="flex justify-center">=</div>
      <span>{output}</span>
    </li>
  );
}
