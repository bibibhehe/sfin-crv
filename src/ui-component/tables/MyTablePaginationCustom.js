import { TablePagination, tablePaginationClasses as classes } from '@mui/base/TablePagination';
import { styled } from '@mui/system';
import React from 'react';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const MyTablePaginationCustom = (props) => {
  return (
    <Root sx={{ width: '100%', maxWidth: '100%' }}>
      <table aria-label="custom pagination table">
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={props.count}
              rowsPerPage={props.rowsPerPage}
              page={props.page}
              slotProps={{
                select: {
                  'aria-label': 'Rows per page'
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                  slots: {
                    firstPageIcon: FirstPageRoundedIcon,
                    lastPageIcon: LastPageRoundedIcon,
                    nextPageIcon: ChevronRightRoundedIcon,
                    backPageIcon: ChevronLeftRoundedIcon
                  }
                }
              }}
              labelRowsPerPage="Số dòng / trang"
              labelDisplayedRows={({ from, to, count }) => `Từ ${from} - ${to} / ${count !== -1 ? count : `more than ${to}`} kết quả`}
              onPageChange={props.onPageChange}
              onRowsPerPageChange={props.onRowsPerPageChange}
              ActionsComponent={() => (
                <div className="pagination-actions">
                  <button
                    onClick={(event) => props.onPageChange(event, props.page - 1)}
                    disabled={props.page === 0}
                    style={{ width: '30px', height: '30px' }}
                  >
                    <ChevronLeftRoundedIcon />
                  </button>
                  <button
                    onClick={(event) => props.onPageChange(event, props.page + 1)}
                    disabled={props.page >= Math.ceil(props.count / props.rowsPerPage) - 1}
                    style={{ width: '30px', height: '30px' }}
                  >
                    <ChevronRightRoundedIcon />
                  </button>
                </div>
              )}
            />
          </tr>
        </tfoot>
      </table>
    </Root>
  );
};

const blue = {
  50: '#F0F7FF',
  200: '#A5D8FF',
  400: '#3399FF',
  900: '#003A75'
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025'
};

const Root = styled('div')(
  ({ theme }) => `
  overflow: clip;

  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.9rem;
    width: 100%;
    color: grey;
  }

  td,
  th {
    text-align: right;
    padding: 8px;
  }

  .pagination-buttons {
    display: flex;
    gap: 4px;
  }

  .page-button {
    background: none;
    border: 1px solid ${grey[200]};
    padding: 4px 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &.active {
      font-weight: bold;
      border-color: ${blue[400]};
    }

    &:hover {
      background-color: ${grey[100]};
    }
  }

  .pagination-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`
);

const CustomTablePagination = styled(TablePagination)(
  ({ theme }) => `
  & .${classes.spacer} {
    display: none;
  }

  & .${classes.toolbar}  {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    padding: 4px 0;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.select}{
    font-family: 'IBM Plex Sans', sans-serif;
    padding: 2px 0 2px 4px;
    width: 5.5rem;
    height: 2.5rem;
    background-color: transparent;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition: all 100ms ease;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
    }
  }

  & .${classes.displayedRows} {
    margin: 0;
    margin-left: auto;
  }

  & .${classes.actions} {
    display: flex;
    gap: 6px;
    text-align: center;
  }

  & .${classes.actions} > button {
    display: flex;
    align-items: center;
    padding: 0;
    background-color: transparent;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition: all 120ms ease;
    width: 1.9rem;
    height: 1.9rem;

    > svg {
      font-size: 22px;
    }

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
    }

    &:disabled {
      opacity: 0.3;
      &:hover {
        background-color: transparent;
      }
    }
  }
`
);

export default MyTablePaginationCustom;
