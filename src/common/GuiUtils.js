import { Chip } from '@mui/material';

export function chipColorByMessageStatus(status) {
  if (status === null) return null;

  //REJECTED, ACCEPTED, RESPONDED
  var color;
  switch (status) {
    case 'RESPONDED':
      color = 'success';
      break;
    case 'RECEIVED':
      color = 'success';
      break;
    case 'ACCEPTED':
      color = 'primary';
      break;
    case 'SENT':
      color = 'primary';
      break;
    case 'REJECTED':
      color = 'error';
      break;
    case 'TIMEOUT':
      color = 'secondary';
      break;
    default:
      color = 'warning';
  }

  return <Chip color={color} label={status} size="small" variant="outlined" />;
}

export function chipColorByResultCode(status) {
  if (status === null) return null;

  return <Chip color={status === '200.00' ? 'success' : 'error'} label={status} size="small" variant="outlined" />;
}

export function chipColorByAchConfirmStatus(status) {
  if (status === null) return null;

  var color;
  switch (status) {
    case 'AUTH':
      color = 'primary';
      break;
    case 'NOAN':
      color = 'secondary';
      break;
    case 'NAUT':
      color = 'error';
      break;
    default:
      color = 'warning';
  }

  return <Chip color={color} label={status} size="small" />;
}
export function chipColorByActiveStatus(status) {
  if (status === null) return null;

  var color;
  switch (status) {
    case 'ACTIVE':
      color = 'success';
      break;
    case 'INACTIVE':
      color = 'error';
      break;
    default:
      color = 'warning';
  }

  return <Chip color={color} label={status} variant="outlined" size="small" />;
}
export function chipColorByAchSettleStatus(status) {
  if (status === null) return null;

  var color;
  switch (status) {
    case 'ACSP':
      color = 'success';
      break;
    case 'RJCT':
      color = 'error';
      break;
    default:
      color = 'warning';
  }

  return <Chip color={color} label={status} variant="outlined" />;
}

export function chipColorBySynchronizeVA(status) {
  if (status === null) return null;

  let color;
  let label;

  switch (status) {
    case 'Y':
      color = 'success';
      label = 'Đã đồng bộ';
      break;
    case 'N':
      color = 'secondary';
      label = 'Chưa đồng bộ';
      break;
    default:
      color = 'warning';
      label = 'Không xác định';
  }

  return <Chip color={color} label={label} variant="outlined" />;
}

export function chipColorStatus(status) {
  if (status === null) return null;

  var color;
  var valueShow = status;
  switch (status.toUpper()) {
    case 'SUCCESS':
      color = 'success';
      valueShow = status;
      break;
    default:
      color = 'error';
  }

  return <Chip color={color} style={{ color: 'white' }} label={valueShow} />;
}

export function chipColorByRespCode(status) {
  if (status === null) return null;

  var color;
  var text = status;

  switch (status) {
    case '00':
      color = 'success';
      text += ' - Thành công';
      break;
    case '68':
      color = 'warning';
      text += ' - Chờ xử lý';

      break;
    default:
      color = 'error';
      text += ' - Thất bại';
  }

  return <Chip color={color} style={{ color: 'white', width: '200px', fontWeight: '700' }} label={text} />;
}
export function valueAPICheck(value) {
  if (value === null) return null;

  var color;
  var valueShow = value;

  return <Chip color={color} style={{ color: 'white', width: '140px' }} label={valueShow} />;
}
export function chipColorByInvestigationParticipantStatus(status) {
  if (status === null) return null;

  var color;
  switch (status) {
    case 'ACTIVE':
      color = 'success';
      break;
    case 'DEACTIVE':
      color = 'secondary';
      break;
    case 'NO':
      color = 'warning';
      break;
    default:
      color = 'error';
  }

  return <Chip color={color} label={status} size="small" variant="outlined" />;
}
export function formatCurency(amount) {
  const validateAmount = (amount) => {
    return /^(\d+|\d+[.]?\d{1,3})$/.test(amount);
  };
  if (amount === null || amount == undefined) return amount;
  if (!validateAmount) return amount;
  let formattedAmount = null;
  try {
    if (typeof amount === 'string') {
      const convertValue = parseInt(amount, 10);
      if (!isNaN(convertValue)) {
        amount = convertValue;
      }
    }
    formattedAmount = amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    formattedAmount = formattedAmount.replace('₫', '');
  } catch (error) {
    console.log(error);
    formattedAmount = amount;
  }

  return formattedAmount;
}
