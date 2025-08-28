import HisMessageInputService from 'services/HisMessageInput.service';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { gridSpacing } from 'store/constant';

import { TableCell, TableRow, Paper, TextField, Button } from '@mui/material';
import ShortTable from 'ui-component/tables/ShortTable';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import Link from '@mui/material/Link';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import TeraboxText from 'ui-component/inputs/TeraboxText';
import NoData from 'ui-component/loadingpages/nodata';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginRight: theme.spacing(1),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));
const MessageOutputBoard = (props) => {
  const inputMessageId = props.inputMessageId;
  const [showDetail, setshowDetail] = useState(true);
  const [searchValue, setsearchValue] = useState('');
  useEffect(() => {
    if (props.isActive) getMessageInput();
  }, [props.isActive]);

  const { t, i18n } = useTranslation();
  const [pageInfo, setPageInfo] = useState(null);

  const headers = [
    // t('common.modelPayments.numbering'),
    t('common.modelPayments.id'),
    t('common.modelPayments.messageIdentifier'),
    t('common.modelPayments.msgid'),
    t('common.modelPayments.senderDatetime'),
    t('common.modelPayments.receiverId')
  ];
  const headers1 = [
    // t('common.modelPayments.numbering'),
    t('common.modelPayments.detailTransaction'),
    ''
  ];
  const [property, setproperty] = useState({
    maxHeight: '200px'
  });
  const [property1, setproperty1] = useState({
    maxHeight: '1000px'
  });
  const [textValueContent, setTextValueContent] = useState('');

  const handleChangeContent = (event) => {
    setTextValueContent(event.target.value);
  };
  const [paging, setPaging] = useState({
    // page: 0,
    // size: defaultSettings.pageSize,
    // sort: 'id,desc'
  });
  const handleChangeRowsPerPage = (event) => {};
  const handleChangePage = (event, newPage) => {};
  const handleShowDetail = (event, value) => {
    setsearchValue(value);
    showDetailValue(true);
  };
  const showDetailValue = () => {
    var listTag = [];
    var rowIndex = 0;
    const value = searchValue;
    const listElements = pageInfo;
    if (showDetail) {
      if (listElements != null && listElements.length > 0 && value != null) {
        const result = listElements.find((b) => b.id === value);
        if (result) {
          setTextValueContent(result.requestBody);
          const values = [
            {
              name: t('common.modelPayments.id'),
              value: result.id
            },
            {
              name: t('common.modelPayments.transRef'),
              value: result.transRef
            },
            {
              name: t('common.modelPayments.msgid'),
              value: result.senderReference
            },
            {
              name: t('common.modelPayments.senderDatetime'),
              value: result.senderDatetime
            },
            {
              name: t('common.modelPayments.timemodif'),
              value: result.modifDatetime
            },
            {
              name: t('common.modelPayments.receiverId'),
              value: result.receiverId
            },
            {
              name: t('common.modelPayments.messageIdentifier'),
              value: result.messageIdentifier
            },
            {
              name: t('common.modelPayments.respDatetime'),
              value: result.respDatetime
            },
            {
              name: t('common.modelPayments.respResultCode'),
              value: result.respResultCode
            },
            {
              name: t('common.modelPayments.respHttpStatusCode'),
              value: result.respHttpStatusCode
            }
          ];
          values.forEach((item) => {
            rowIndex++;
            var tableRow = (
              <TableRow key={rowIndex}>
                <TableCell className="align-middle text-center no-wrap-box">
                  <b>{item.name}:</b>
                </TableCell>
                <TableCell className="align-middle text-center no-wrap-box">{item.value}</TableCell>
              </TableRow>
            );
            listTag.push(tableRow);
          });
        }
      }
      return listTag;
    }
  };
  const buildElementRows = () => {
    var listTag = [];
    var rowIndex = 0;

    const listElements = pageInfo;
    if (listElements != null && listElements.length > 0) {
      listElements.forEach((object) => {
        rowIndex++;
        var tableRow = (
          <TableRow key={rowIndex}>
            <TableCell className="align-middle text-center no-wrap-box">{object.id}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.messageIdentifier}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              <Link To="#" style={{ cursor: 'pointer' }} onClick={(e) => handleShowDetail(e, object.id)}>
                {object.senderReference}
              </Link>
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.senderDatetime}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.receiverId}</TableCell>
          </TableRow>
        );

        listTag.push(tableRow);
      });
    }

    return listTag;
  };
  const getMessageInput = () => {
    // setIsLoading(true, () => {
    HisMessageInputService.getOutPut(inputMessageId).then(
      (response) => {
        //   setIsLoading(false);
        setPageInfo(response.data);
      },
      (error) => {}
    );
    // });
  };
  if (!pageInfo || pageInfo.length === 0) {
    return <NoData />;
  }
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={t('common.modelPayments.searchMsgid')}
              inputProps={{ 'aria-label': t('common.modelPayments.searchMsgid') }}
            />
          </Search> */}
          <ShortTable
            headers={headers}
            totalElements={pageInfo.totalElements}
            paging={paging}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            buildElementRows={buildElementRows}
            property={property}
          />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6}>
            <ShortTable
              headers={headers1}
              totalElements={pageInfo.totalElements}
              paging={paging}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              buildElementRows={showDetailValue}
              property={property1}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TeraboxText defaultText={textValueContent} txtLabel={t('common.modelPayments.contentBody')} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default MessageOutputBoard;
