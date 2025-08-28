// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import { useState } from 'react';
import Backdrop from 'ui-component/loadingpages/loadingwaiting';
import CustomSnackbar from 'ui-component/cards/CustomSnackbar';
import TableProccessing from './FormLoad/ContentTable';
import TableProccessingBranch from './FormLoad/Branch/ContentTable';
import TableProccessingCashier from './FormLoad/Cashier/ContentTable';
import SearchForm from './FormLoad/SearchForm';
import defaultSettings from 'defaultSetting';
import ServiceAPI from 'services/ManagerMerchant/Merchant.service';

const ManagerMerchant = () => {
  // const [message, setMessage] = useState('');
  const [typeNotify, settypeNotify] = useState('success');
  const [dataProvice, setdataProvice] = useState([]);
  const [masterMerchant, setmasterMerchant] = useState([]);
  const [dataBank, setdataBank] = useState([]);
  const [dataTctt, setDataTctt] = useState([]);
  const [rowSelected, setrowSelected] = useState(-1);
  const [rowSelectedBranch, setrowSelectedBranch] = useState(-1);
  const [dataBranch, setdataBranch] = useState({
    totalElements: 0
  });
  const [dataCashier, setdataCashier] = useState({
    totalElements: 0
  });

  const [pageInfo, setPageInfo] = useState({
    totalElements: 0
  });
  const getTctt = () => {
    ServiceAPI.get_tctt().then(
      (response) => {
        setDataTctt(response.data);
      },
      (error) => { }
    );
  }
  const handleSelectRow = (id) => {
    ServiceAPI.get_brach(id).then(
      (response) => {
        setdataBranch(response.data);
      },
      (error) => {
        setrowSelected(-1);
        setdataBranch(null);

        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        showAlert('Không tìm thấy dữ liệu. ' + message);
        return;
      }
    );
    setrowSelectedBranch(-1);
    setdataCashier(null);
    ServiceAPI.get_bank().then(
      (response) => {
        setdataBank(response.data);
      },
      (error) => { }
    );
    setrowSelected(id);
  };
  const handleSelectRowCashier = (id) => {
    ServiceAPI.get_cashier(id).then(
      (response) => {
        setdataCashier(response.data);
      },
      (error) => {
        setrowSelectedBranch(-1);
        setdataCashier(null);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        showAlert('Không tìm thấy dữ liệu Cashier. ' + message);
        return;
      }
    );

    setrowSelectedBranch(id);
  };
  const [paging, setPaging] = useState({
    page: 0,
    size: defaultSettings.pageSize
  });
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [filtersInput, setFiltersInput] = useState({
    name: '',
    status: '',
    merchantCode: ''
  });
  const listAllElements = (object) => {
    handleLoadingClick();
    ServiceAPI.getList(paging, object)
      .then(
        (response) => {
          handleLoadingClick();
          setPageInfo(response.data);
          setrowSelected(-1);
          setdataBranch([]);
          setrowSelectedBranch(-1);
          setdataCashier(null);
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
          handleLoadingClick();
        }
      )
      .finally(() => setShowBackdrop(false));
  };
  const handleDeleteMerchant = (object) => {
    handleLoadingClick();
    ServiceAPI.deleteMerchant(object)
      .then(
        (response) => {
          handleLoadingClick();
          showAlertSuccess('Xóa thành công');
          listAllElements();
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
          handleLoadingClick();
        }
      )
      .finally(() => setShowBackdrop(false));
  };
  const handleDeleteBranch = (object) => {
    ServiceAPI.deleteBranch(object).then(
      (response) => {
        showAlertSuccess('Xóa thành công');
        ServiceAPI.get_brach(rowSelected).then(
          (response) => {
            setdataBranch(response.data);
          },
          (error) => { }
        );
      },
      (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        showAlert(message);
      }
    );
  };
  const handleDeleteCashier = (object) => {
    ServiceAPI.deleteCashier(object).then(
      (response) => {
        showAlertSuccess('Xóa thành công');
        ServiceAPI.get_cashier(rowSelectedBranch).then(
          (response) => {
            setdataCashier(response.data);
          },
          (error) => { }
        );
      },
      (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        showAlert(message);
      }
    );
  };
  const get_provice = () => {
    ServiceAPI.get_provice().then(
      (response) => {
        setdataProvice(response.data);
      },
      (error) => { }
    );
  };

  const get_masterMerchant = () => {
    ServiceAPI.get_masterMerchant().then(
      (response) => {
        setmasterMerchant(response.data);
      },
      (error) => { }
    );
  };

  const [open, setOpen] = useState(false);
  const [messageError, setmessageError] = useState('');
  const showAlert = (message) => {
    settypeNotify('error');
    setmessageError(message);
    setOpen(true);
  };
  const handleSearch = (object) => {
    setFiltersInput(object);
    const newPaging = { ...paging };
    newPaging.page = 0;
    setPaging(newPaging);
  };
  const showAlertSuccess = (message) => {
    setmessageError(message);
    settypeNotify('success');
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleReloadConfig01 = () => {
    listAllElements(filtersInput);
  };
  const handleReloadConfig02 = (page) => {
    ServiceAPI.get_brach(rowSelected, page).then(
      (response) => {
        setdataBranch(response.data);
      },
      (error) => {
        setdataBranch(null);
      }
    );
  };
  const handleReloadConfig03 = (page) => {
    ServiceAPI.get_cashier(rowSelectedBranch, page).then(
      (response) => {
        setdataCashier(response.data);
      },
      (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        showAlert('Không tìm thấy dữ liệu Cashier. ' + message);
        return;
      }
    );
  };
  const handleLoadingClick = () => {
    setShowBackdrop(!showBackdrop);
  };
  const handleChangePage = (event, newPage) => {
    const newPaging = { ...paging };
    newPaging.page = newPage;
    setPaging(newPaging);
  };
  const handleChangeRowsPerPage = (event) => {
    const newPaging = { ...paging };
    newPaging.size = parseInt(event.target.value, 10);
    newPaging.page = 0;
    setPaging(newPaging);
  };

  const showBranch = () => {
    let result = false;
    if (rowSelected > -1) {
      result = true;
    }
    return result;
  };
  const showCashier = () => {
    let result = false;
    if (rowSelectedBranch > -1) {
      result = true;
    }
    return result;
  };
  useEffect(() => {
    setShowBackdrop(true);
    listAllElements(filtersInput);
    get_provice();
    get_masterMerchant();
    getTctt();
  }, [paging]);

  return (
    <MainCard title="Quản lý Merchant Doanh Nghiệp">
      <SearchForm handleSearch1={handleSearch} />
      <br />
      <br />
      <TableProccessing
        data={pageInfo}
        onLoad={handleReloadConfig01}
        paging={paging}
        totalElements={pageInfo.totalElements}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        getProvice={dataProvice}
        dataTctt={dataTctt}
        dataMerchant={masterMerchant}
        handleDeleteMerchant={handleDeleteMerchant}
        rowSelected={rowSelected}
        handleSelectRow={handleSelectRow}
      />
      <br />
      <br />
      <br />
      {showBranch() && (
        <TableProccessingBranch
          data={dataBranch}
          id={rowSelected}
          rowSelected={rowSelectedBranch}
          onLoad={handleReloadConfig02}
          handleDeleteMerchant={handleDeleteBranch}
          handleSelectRow={handleSelectRowCashier}
          dataBank={dataBank}
        />
      )}
      <br />
      <br />
      <br />
      {showCashier() && (
        <TableProccessingCashier
          data={dataCashier}
          id={rowSelectedBranch}
          onLoad={handleReloadConfig03}
          dataBank={dataBank}
          handleDelete={handleDeleteCashier}
        />
      )}

      <CustomSnackbar open={open} handleClose={handleClose} message={messageError} autoHideDuration={3000} typeNotify={typeNotify} />

      <Backdrop show={showBackdrop} />
    </MainCard>
  );
};

export default ManagerMerchant;
