// src/BankInfo.js
import React from 'react';
import { useGlobalData } from 'provider/GlobalProvider';

function BankInfo(props) {
  const globalData = useGlobalData();
  const listNapasBank = globalData.listNapasBank;

  if (listNapasBank == undefined) return <>{props.bankId}</>;

  const bank = listNapasBank.find((b) => b.participantCode === props.bankId);

  if (bank == undefined) return <>{props.bankId}</>;

  return <>{bank.participantCode + ' - ' + bank.shortName}</>;
}

export default BankInfo;
