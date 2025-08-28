import { TableRow, TablePagination } from '@mui/material';

const MyTablePagination = (props) => {
  return (
    <>
      {props.paging.page != null && (
        <TableRow>
          <TablePagination
            style={{ display: 'flex', justifyContent: 'flex-start' }}
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={props.colSpan}
            count={props.count}
            rowsPerPage={props.paging.size}
            page={props.paging.page}
            onPageChange={props.onPageChange}
            onRowsPerPageChange={props.onRowsPerPageChange}
            showFirstButton={true}
            showLastButton={true}
            component="div"
          />
        </TableRow>
      )}
    </>
  );
};

export default MyTablePagination;
