import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import { formatCurency } from 'common/GuiUtils';

// Tạo styles sử dụng styled
// const useStyles = styled((theme) => ({
//   infoBox: {
//     border: '1px solid black',
//     padding: theme.spacing(2),
//     margin: theme.spacing(2)
//   },
//   title: {
//     color: 'blue', // Màu của title
//     fontStyle: 'italic' // In nghiêng
//   }
// }));

const ListTable = ({ title, data, linkText, rowData }) => {
  const { t, i18n } = useTranslation();
  if (!data) {
    return <div>No data available</div>;
  }

  // Chia mảng thành 3 phần
  const entries = Object.entries(data);
  const chunkSize = Math.ceil(entries.length / rowData);
  const columWidth = Math.floor(12 / rowData);
  const chunkedData = [];
  for (let i = 0; i < entries.length; i += chunkSize) {
    chunkedData.push(entries.slice(i, i + chunkSize));
  }
  const ValueCheck = (key, value) => {
    var upperValue = key.toUpperCase();
    if (upperValue && upperValue.includes('AMOUNT')) {
      return formatCurency(value);
    }
    return value;
  };
  return (
    <Paper item xs={12} md={12}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5em', borderBottom: '3px double' }}>
        <Typography style={{ fontSize: '1.875rem' }}>{title}</Typography>
      </div>
      {/* <Grid item xs={12} md={12}>

      </Grid> */}
      <Grid container spacing={2}>
        {chunkedData.map((chunk, index) => (
          <Grid item xs={12} md={columWidth} key={index}>
            <TableContainer>
              <Table>
                <TableBody>
                  {chunk.map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell style={{ width: '250px' }}>
                        <h4 style={{ margin: 0 }}>{t(linkText + '.' + key)}: </h4>
                      </TableCell>

                      <TableCell>{ValueCheck(key, value)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ListTable;
