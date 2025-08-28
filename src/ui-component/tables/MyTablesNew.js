import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import MyTablePagination from '../MyTablePagination';

const MyTablesNew = (props) => {
  const emptyRows = props.paging.page > 0 ? Math.max(0, (1 + props.paging.page) * props.paging.size - props.totalElements) : 0;

  return (
    <TableContainer component={Paper}>
      {/* <Table stickyHeader aria-label="sticky table"> */}
      <Table stickyHeader aria-label="striped table" style={{ minWidth: '1100px' }}>
        <TableHead>
          <MyTablePagination
            colSpan={props.headers.size}
            count={props.totalElements}
            paging={props.paging}
            onPageChange={props.onPageChange}
            onRowsPerPageChange={props.onRowsPerPageChange}
          />
          <TableRow>
            {props.headers != null &&
              props.headers.map((header, index) => (
                <TableCell key={index} style={{ textAlign: 'center' }}>
                  {header}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.buildElementRows()}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell w style={{ border: 'none' }} colSpan={props.headers.size} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <MyTablePagination
            colSpan={props.headers.size}
            count={props.totalElements}
            paging={props.paging}
            onPageChange={props.onPageChange}
            onRowsPerPageChange={props.onRowsPerPageChange}
          />
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default MyTablesNew;
