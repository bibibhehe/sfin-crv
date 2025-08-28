import React, { useState } from 'react';
import { TextField, Button, Typography, Box, ButtonGroup } from '@mui/material';
import JSONPretty from 'react-json-pretty';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
export default function TeraboxText({ defaultText, RawLabel, txtLabel, valueDetail, ResendTS, isRowSelectedRight }) {
  const [copySuccess, setCopySuccess] = useState(false);
  if (!defaultText) {
    return <Box sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center', marginTop: 2 }}></Box>;
  }

  let parsedJson;
  try {
    parsedJson = JSON.parse(defaultText);
  } catch (error) {
    parsedJson = 'Loi';
  }
  const formattedJson = JSON.stringify(parsedJson, null, 2);
  var JSONPrettyMon = require('react-json-pretty/dist/monikai');

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };
  const handleResend = (id) => {
    ResendTS(id);
  };
  return (
    <Box sx={{ maxWidth: '90%', margin: 'auto', marginTop: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, paddingBottom: '10px' }}>
        <Button variant="contained" onClick={handleCopy}>
          Copy
        </Button>
        {isRowSelectedRight > 0 && (
          <Button
            style={{ marginLeft: '5px' }}
            variant="contained"
            startIcon={<SendOutlinedIcon />}
            onClick={() => handleResend(valueDetail.id)}
          >
            Resend
          </Button>
        )}
        {copySuccess && <span style={{ color: 'green' }}> Copied!</span>}
        <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'right', paddingRight: '10px' }}>
          {RawLabel}
        </Typography>
      </Box>
      <Box
        sx={{ maxHeight: '655px', overflow: 'auto' }}
      >
        <JSONPretty themeClassName="custom-json-pretty" theme={JSONPrettyMon} data={defaultText}></JSONPretty>
      </Box>
    </Box>
  );
}
