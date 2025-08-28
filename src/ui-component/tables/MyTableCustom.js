import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDataGrid-main': {
      border: '1px solid #ccc'
    },
    '& .MuiDataGrid-columnsContainer': {
      borderBottom: '1px solid #ccc'
    },
    '& .MuiDataGrid-cell': {
      borderBottom: '1px solid #ccc'
    }
  },
  rowSelect: {
    border: '1px solid rgba(224, 224, 224, 1);',
    paddingLeft: '0.3rem',
    borderBottom: '3px solid rgba(224, 224, 224, 1)'
  },
  editRowTable: {
    padding: '0.4rem'
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.appBar
  }
}));
const calculateMinWidthInRem = (label) => {
  const charWidthInRem = 0.375;
  return label.length * charWidthInRem + 3;
};

const MyTableCustomMultiRow = (props) => {
  const classes = useStyles();
  const columns = props.headers;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '34rem' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align ? column.align : 'left'}
                  style={{ minWidth: calculateMinWidthInRem(column.label) + 'rem', width: column.width }}
                  className={classes.rowSelect}
                  colSpan={column.element ? column.element.length : 1}
                  rowSpan={column.spaneNumber ? column.spaneNumber : 1}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {columns.map((column) =>
                column.element
                  ? column.element.map((subColumn) => (
                      <TableCell
                        key={subColumn.id}
                        style={{ top: 57, minWidth: calculateMinWidthInRem(subColumn.label) + 'rem', width: subColumn.width }}
                        // style={{ minWidth: subColumn.minWidth }}
                        className={classes.rowSelect + ' ' + classes.editRowTable}
                      >
                        {subColumn.label}
                      </TableCell>
                    ))
                  : null
              )}
            </TableRow>
          </TableHead>
          <TableBody>{props.buildElementRows()}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MyTableCustomMultiRow;
