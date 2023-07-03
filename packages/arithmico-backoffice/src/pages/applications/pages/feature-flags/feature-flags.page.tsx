import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { ActionButton } from "../../../../components/action-button/action-button";
import { Card } from "../../../../components/card/card";
import Heading from "../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../components/pagination-toolbar/pagination-toolbar";
import { TableCell } from "../../../../components/table-cell/table-cell";
import { TableHeaderCell } from "../../../../components/table-header-cell/table-header-cell";
import { TableRow } from "../../../../components/table-row/table-row";
import { Table } from "../../../../components/table/table";
import { AddIcon } from "../../../../icons/add.icon";
import { useGetFeatureFlagsQuery } from "../../../../store/api/resources/feature-flags/feature-flags.api";
import { AddFeatureFlagDialog } from "./components/add-feature-flag-dialog";

export function FeatureFlagsPage() {
  const limit = 10;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [skip, setSkip] = useState(0);
  const { isSuccess, data } = useGetFeatureFlagsQuery({ skip, limit });

  return (
    <>
      <AddFeatureFlagDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <div className="my-4 flex items-center">
        <Heading level={1}>Funktionen</Heading>
        <ActionButton className="ml-auto" onClick={() => setIsDialogOpen(true)}>
          <AddIcon className="mr-2 h-6 w-6 fill-white" /> Hinzufügen
        </ActionButton>
      </div>
      {isSuccess && (
        <Card>
          <Table
            className="table-fixed"
            header={
              <>
                <TableHeaderCell className="w-1/5">
                  <FormattedMessage id="versions.feature-flags.name" />
                </TableHeaderCell>
                <TableHeaderCell className="w-1/5">
                  <FormattedMessage id="versions.feature-flags.flag" />
                </TableHeaderCell>
                <TableHeaderCell className="w-1/5">
                  <FormattedMessage id="versions.feature-flags.type" />
                </TableHeaderCell>
                <TableHeaderCell className="w-1/5">
                  <FormattedMessage id="versions.feature-flags.minimum-version" />
                </TableHeaderCell>
                <TableHeaderCell>
                  <FormattedMessage id="versions.feature-flags.maximum-version" />
                </TableHeaderCell>
              </>
            }
          >
            {data.items.map((featureFlag) => (
              <TableRow key={featureFlag.id}>
                <TableCell>{featureFlag.name}</TableCell>
                <TableCell>{featureFlag.flag}</TableCell>
                <TableCell>{featureFlag.type}</TableCell>
                <TableCell>
                  v{featureFlag.enabledSinceVersion.major}.
                  {featureFlag.enabledSinceVersion.minor}.
                  {featureFlag.enabledSinceVersion.patch}
                </TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            ))}
          </Table>
          {data.total > limit && (
            <PaginationToolbar
              className="mt-4"
              skip={skip}
              limit={limit}
              total={data.total}
              onChange={setSkip}
            />
          )}
        </Card>
      )}
    </>
  );
}
