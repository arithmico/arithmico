import classNames from "classnames";

export interface TableProps {
  header?: React.ReactNode[];
  rows: React.ReactNode[][];
}

export function Table({ header, rows }: TableProps) {
  return (
    <table>
      {header && (
        <thead>
          <tr className={classNames("border-b", "border-neutral-400")}>
            {header.map((headerItem) => (
              <th className={classNames("p-2", "text-left", "font-bold")}>
                {headerItem}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row) => (
          <tr
            className={classNames(
              "border-b",
              "last:border-b-0",
              "border-neutral-300"
            )}
          >
            {row.map((rowItem) => (
              <td className={classNames("p-2")}>{rowItem}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
