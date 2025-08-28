export default function paymentSettleStatusWithDesc(status: number): string {
  var result: string;

  if(status == null) {
    return null;
  }

  switch (status) {
    case 1:
      result = status + ' - Waiting for settlement';
      break;
    case 2:
      result = status + ' - No settlement';
      break;
    case 3:
      result = status + ' - Not yet defined settlement status';
      break;
    case 4:
      result = status + ' - Be settled';
      break;
    case 5:
      result = status + ' - Undefined';
      break;
    default:
      result = status.toString();
  }

  return result;
}
