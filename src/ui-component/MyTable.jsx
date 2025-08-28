import { Paper, Table, TableBody, TableCell, TableContainer, Grid, TableFooter, TableHead, TableRow } from '@mui/material';
import MyTablePagination from './MyTablePagination';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/LibraryAdd';

const useStyles = makeStyles({
  headerCell: {
    backgroundColor: '#2196f3',
    color: 'white',
    fontWeight: 'bold',
    position: 'sticky',
    left: 0,
    zIndex: 3,
    textAlign: 'center',
    minWidth: '200px'
  },
  headerCellbuild: {
    backgroundColor: '#2196f3',
    color: 'white',
    fontWeight: 'bold'
    // minWidth: '200px'
  }
});

const MyTable = (props) => {
  const classes = useStyles();
  const emptyRows = props.paging.page > 0 ? Math.max(0, (1 + props.paging.page) * props.paging.size - props.totalElements) : 0;
  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={10.7}>
            {props.paging.page != null ? (
              <MyTablePagination
                colSpan={props.headers.size}
                count={props.totalElements}
                paging={props.paging}
                onPageChange={props.onPageChange}
                onRowsPerPageChange={props.onRowsPerPageChange}
              />
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={12} md={1.3} style={{ padding: '40px 0 0 0 ' }}>
            {props.handleAddClick ? (
              <Button variant="contained" onClick={props.handleAddClick} startIcon={<AddIcon />}>
                Thêm
              </Button>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          {/* <Table stickyHeader aria-label="striped table" style={{ minWidth: '1200px' }}> */}
          <TableHead>
            <TableRow>
              {props.headers != null &&
                props.headers.map((header, index) => (
                  <TableCell
                    key={index}
                    style={{ minWidth: index == 0 ? header.length * 15 + 'px' : header.length * 10 + 'px' }}
                    className={classes.headerCellbuild}
                  >
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
          {/* <TableFooter>
          </TableFooter> */}
        </Table>
      </TableContainer>
      {props.paging.page != null ? (
        <MyTablePagination
          colSpan={props.headers.size}
          count={props.totalElements}
          paging={props.paging}
          onPageChange={props.onPageChange}
          onRowsPerPageChange={props.onRowsPerPageChange}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default MyTable;
