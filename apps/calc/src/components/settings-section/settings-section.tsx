import classNames from "classnames";

interface SettingsSectionProps {
  heading: string;
  children: React.ReactNode;
}

export default function SettingsSection({
  heading,
  children,
}: SettingsSectionProps) {
  return (
    <section className={classNames("mb-16")}>
      <h1
        className={classNames(
          "text-3xl",
          "mb-4",
          "border-b",
          "theme-light:border-black/10",
          "font-medium",
          "bold-font:font-bold"
        )}
      >
        {heading}
      </h1>
      <ul className={classNames("pl-8")}>{children}</ul>
    </section>
  );
}
