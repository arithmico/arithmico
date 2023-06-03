import classNames from "classnames";

interface Props {
  className?: string;
}

export default function LoadingIcon({ className }: Props) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("animate-spin stroke-white", className)}
      aria-hidden
    >
      <path
        d="M86 50C86 57.1201 83.8886 64.0804 79.9329 70.0005C75.9772 75.9207 70.3547 80.5349 63.7766 83.2597C57.1985 85.9844 49.9601 86.6973 42.9767 85.3083C35.9934 83.9192 29.5788 80.4905 24.5442 75.4558C19.5095 70.4212 16.0808 64.0066 14.6917 57.0233C13.3027 50.0399 14.0156 42.8015 16.7403 36.2234C19.4651 29.6453 24.0793 24.0228 29.9995 20.0671C35.9196 16.1114 42.8799 14 50 14"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
