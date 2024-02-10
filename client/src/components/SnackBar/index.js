import React, { useContext, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AuthContext } from '../../utils/auth';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function SnackBar({ severity, message }) {
  const { isSnackBarOpen, openSnackBar } = useContext(AuthContext)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  };

  useEffect(() => {
      setTimeout(() => {
        openSnackBar(!isSnackBarOpen);
      }, 3000);
  }, [isSnackBarOpen, openSnackBar]);

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={isSnackBarOpen} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default SnackBar;
