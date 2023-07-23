import classNames from "classnames";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { ActionButton } from "../../../../components/action-button/action-button";
import { Card } from "../../../../components/card/card";
import Heading from "../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../components/pagination-toolbar/pagination-toolbar";
import { TableCell } from "../../../../components/table-cell/table-cell";
import { TableHeaderCell } from "../../../../components/table-header-cell/table-header-cell";
import { TableRow } from "../../../../components/table-row/table-row";
import { Table } from "../../../../components/table/table";
import { AddIcon } from "../../../../icons/add.icon";
import { ChevronRightIcon } from "../../../../icons/chevron-right.icon";
import { useGetConfigurationsQuery } from "../../../../store/api/resources/configurations/configurations.api";
import { CreateConfigurationDialog } from "./components/create-configuration.dialog";

export function ConfigurationsPage() {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const { isSuccess, data } = useGetConfigurationsQuery({ skip, limit });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <CreateConfigurationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <div className="my-4 flex items-center">
        <Heading level={1}>
          <FormattedMessage id="applications.configurations" />
        </Heading>
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
                <TableHeaderCell>
                  <FormattedMessage id="applications.configurations.name" />
                </TableHeaderCell>
                <TableHeaderCell>
                  <FormattedMessage id="applications.configurations.revisions" />
                </TableHeaderCell>
                <TableHeaderCell>
                  <FormattedMessage id="applications.configurations.deployments" />
                </TableHeaderCell>
                <TableHeaderCell>
                  <FormattedMessage id="applications.configurations.auto-build" />
                </TableHeaderCell>
                <TableHeaderCell>
                  <span className="sr-only">
                    <FormattedMessage id="applications.configurations.details" />
                  </span>
                </TableHeaderCell>
              </>
            }
          >
            {data.items.map(({ id, name, autoBuild, revisions }) => {
              const configurationUrl = `/applications/configurations/${id}`;
              return (
                <TableRow
                  key={id}
                  onClick={() => navigate(configurationUrl)}
                  className="cursor-pointer"
                >
                  <TableCell>{name}</TableCell>
                  <TableCell>{revisions === 0 ? "-" : revisions}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    {autoBuild ? (
                      <FormattedMessage id="common.yes" />
                    ) : (
                      <FormattedMessage id="common.no" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={configurationUrl}
                      className={"float-right flex items-center"}
                    >
                      <span className="sr-only">
                        <FormattedMessage id="applications.configurations.details" />
                      </span>
                      <ChevronRightIcon
                        className={classNames("w-8", "h-8", "fill-neutral-500")}
                      />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </Table>
          {data.total > limit && (
            <PaginationToolbar
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
