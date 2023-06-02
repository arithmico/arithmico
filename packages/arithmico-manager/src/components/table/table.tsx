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
            {header.map((headerItem, index) => (
              <th
                key={`table-header-${index}`}
                className={classNames("p-2", "text-left", "font-bold")}
              >
                {headerItem}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr
            key={`table-row-${rowIndex}`}
            className={classNames(
              "border-b",
              "last:border-b-0",
              "border-neutral-300"
            )}
          >
            {row.map((rowItem, columnIndex) => (
              <td
                key={`table-cell-${rowIndex}-${columnIndex}`}
                className={classNames("p-2")}
              >
                {rowItem}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
