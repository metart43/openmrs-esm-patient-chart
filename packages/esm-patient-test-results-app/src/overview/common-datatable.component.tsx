import * as React from 'react';
import {
  DataTable,
  Table,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from 'carbon-components-react';
import { TypedTableRow } from './helpers';
import { OverviewPanelData } from '../resources/useOverviewData';
import styles from './common-overview.scss';

interface CommonDataTableProps {
  data: Array<OverviewPanelData>;
  tableHeaders: Array<{
    key: string;
    header: string;
  }>;
  title?: string;
  toolbar?: React.ReactNode;
  description?: React.ReactNode;
}

const CommonDataTable: React.FC<CommonDataTableProps> = ({ title, data, description, toolbar, tableHeaders }) => (
  <DataTable rows={data} headers={tableHeaders}>
    {({ rows, headers, getHeaderProps, getRowProps, getTableProps, getTableContainerProps }) => (
      <TableContainer title={title} description={description} {...getTableContainerProps()}>
        {toolbar}
        <Table {...getTableProps()} isSortable useZebraStyles>
          <colgroup className={styles.columns}>
            <col span={1} />
            <col span={1} />
            <col span={1} />
          </colgroup>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.key} {...getHeaderProps({ header })} isSortable>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TypedTableRow key={row.id} interpretation={data[i]?.interpretation} {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TypedTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export default CommonDataTable;
