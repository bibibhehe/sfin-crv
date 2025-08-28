import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';

const ShortTable = (props) => {
  return (
    <TableContainer component={Paper} sx={props.property}>
      <Table stickyHeader aria-label="sticky table" sx={props.table}>
        <TableHead sx={props.header}>
          <TableRow>
            {props.headers.map((header, index) => (
              <TableCell sx={props.row} key={index}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className={props.body}>{props.buildElementRows()}</TableBody>
        <TableFooter></TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ShortTable;
