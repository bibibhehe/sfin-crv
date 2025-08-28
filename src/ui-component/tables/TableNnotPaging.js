import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  headerCell: {
    backgroundColor: '#2196f3',
    color: 'white',
    fontWeight: 'bold',
    position: 'sticky',
    left: 0,
    zIndex: 3
    // minWidth: '200px'
  },
  headerCellbuild: {
    backgroundColor: '#2196f3',
    color: 'white',
    fontWeight: 'bold'
    // minWidth: '200px'
  }
});

const TableNormal = (props) => {
  const classes = useStyles();

  const emptyRows = props.paging.page > 0 ? Math.max(0, (1 + props.paging.page) * props.paging.size - props.totalElements) : 0;

  return (
    <>
      <TableContainer component={Paper} style={{ width: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          {/* <Table stickyHeader aria-label="striped table" style={{ minWidth: '1200px' }}> */}
          <TableHead>
            <TableRow>
              {props.headers != null &&
                props.headers.map((header, index) => (
                  <TableCell key={index} style={{ maxWidth: '150px' }} className={classes.headerCellbuild}>
                    {header}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.buildElementRows()}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell style={{ border: 'none' }} colSpan={props.headers.size} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableNormal;
