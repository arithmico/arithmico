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
import { useGetConfigurationsQuery } from "../../../../store/api/resources/configurations/configurations.api";
import { CreateConfigurationDialog } from "./components/create-configuration.dialog";

export function ConfigurationsPage() {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { isSuccess, data } = useGetConfigurationsQuery({ skip, limit });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <CreateConfigurationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <div className="my-4 flex items-center">
        <Heading level={1}>Konfigurationen</Heading>
        <ActionButton className="ml-auto" onClick={() => setIsDialogOpen(true)}>
          <AddIcon className="mr-2 h-6 w-6 fill-white" />
          Hinzufügen
        </ActionButton>
      </div>
      {isSuccess && (
        <Card>
          <Table
            header={
              <>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Revisionen</TableHeaderCell>
                <TableHeaderCell>Deployments</TableHeaderCell>
                <TableHeaderCell>Autobuild</TableHeaderCell>
              </>
            }
          >
            {data.items.map(({ id, name, autoBuild }) => (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>0</TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  {autoBuild ? (
                    <FormattedMessage id="common.yes" />
                  ) : (
                    <FormattedMessage id="common.no" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <PaginationToolbar
            skip={skip}
            limit={limit}
            total={data.total}
            onChange={setSkip}
          />
        </Card>
      )}
    </>
  );
}
