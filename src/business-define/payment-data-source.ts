export default function paymentDataSourceWithDesc(dataSource: number): string {
  var dataSourceWithDesc: string;

  if(dataSource == null) {
    return null;
  }

  switch (dataSource) {
    case 1:
      dataSourceWithDesc = dataSource + ' - NAPAS';
      break;
    case 2:
      dataSourceWithDesc = dataSource + ' - BEN';
      break;
    default:
      dataSourceWithDesc = dataSource.toString();
  }

  return dataSourceWithDesc;
}
