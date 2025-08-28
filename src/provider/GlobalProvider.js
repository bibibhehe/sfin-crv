import React, { createContext, useContext, useState, useEffect } from 'react';
import TblNapasBankService from 'services/TblNapasBank.service';

const AppDictionaryContext = createContext();

export function AppDictionaryProvider({ children }) {
  const [appDictionary, setAppDictionary] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách ngân hàng
    TblNapasBankService.list()
      .then((responseNapasBank) => {
        const listNapasBank = responseNapasBank.data;
        setAppDictionary({
          listNapasBank: listNapasBank
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <AppDictionaryContext.Provider value={appDictionary}>{children}</AppDictionaryContext.Provider>;
}

export function useGlobalData() {
  return useContext(AppDictionaryContext);
}
