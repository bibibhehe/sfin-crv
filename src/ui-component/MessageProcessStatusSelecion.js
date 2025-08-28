import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function MessageProcessStatusSelecion(props) {
  const listNapasBank = [
    {
      status: 'INCOMING',
      description: 'Đã nhận bản tin đến từ client'
    },
    {
      status: 'ACCEPTED',
      description: 'Bản tin đã pass các bước verify ban đầu'
    },
    {
      status: 'RESPONDED',
      description: 'Đã gửi phản hồi cho client'
    },
    {
      status: 'SENT',
      description: 'Đã gửi bản tin đến server'
    },
    {
      status: 'RECEIVED',
      description: 'Đã nhận phản hồi từ server'
    },
    {
      status: 'TIMEOUT',
      description: 'Không nhận được phản hồi từ server trong thời gian cho phép'
    },
    {
      status: 'REJECTED',
      description: 'Bản tin từ client đến bị từ chối xử lý do giới hạn hoặc do đang có request trước đó đang xử lý'
    },
    {
      status: 'ERROR',
      description: 'Các lỗi không xác định khác'
    },
    {
      status: 'BREAK',
      description: 'Ngắt'
    }
  ];

  const buildList = () => {
    let jsxTag = [];

    jsxTag.push(
      <MenuItem value="" key="">Tất cả
      </MenuItem>
    );

    if (listNapasBank != undefined) {
      for (let i = 0; i < listNapasBank.length; i++) {
        var bank = listNapasBank[i];
        jsxTag.push(
          <MenuItem value={bank.status} key={i}>
            {bank.status} - {bank.description}
          </MenuItem>
        );
      }
    }

    return jsxTag;
  }

  return (
      <FormControl fullWidth>
        <InputLabel id={props.name}>{props.label}</InputLabel>
        <Select
          labelId={props.name}
          name={props.name}
          value={props.value}
          label={props.label}
          onChange={props.onChange}
          fullWidth
        >
          {buildList()}
        </Select>
      </FormControl>
  );
}
