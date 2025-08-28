// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://berrydashboard.io" target="_blank" underline="hover">
      Phòng thanh toán bù trừ tự động
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://napas.com.vn" target="_blank" underline="hover">
      &copy; Công ty cổ phần thanh toán Quốc gia Việt Nam
    </Typography>
  </Stack>
);

export default AuthFooter;
