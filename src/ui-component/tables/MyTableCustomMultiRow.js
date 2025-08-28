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

export function calculateMinWidthInRem(text, fontSizeRem = 0.875, fontFamily = 'Roboto') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return 0;

  const fontSizePx = fontSizeRem * 16;
  context.font = `${fontSizePx}px ${fontFamily}`;

  const textWidthInPx = context.measureText(text).width;

  const textWidthInRem = textWidthInPx / 16;

  return textWidthInRem;
}

const MyTableCustomMultiRow = (props) => {
  const classes = useStyles();
  const columns = props.headers;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 650 }}>
        <Table stickyHeader aria-label="sticky table" sx={{ tableLayout: 'auto' }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align ? column.align : 'left'}
                  style={{
                    minWidth: calculateMinWidthInRem(column.label) + 'rem',
                    width: column.width, whiteSpace: 'nowrap'
                  }}
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
                      style={{
                        top: 57, minWidth: calculateMinWidthInRem(subColumn.label) + 'rem', width: subColumn.width,
                        whiteSpace: 'nowrap'
                      }}
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
