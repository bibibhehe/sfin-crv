import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop as MuiBackdrop } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const Backdrop = (props) => {
  const { show, clicked } = props;
  const classes = useStyles();

  return (
    <MuiBackdrop className={classes.backdrop} open={show} onClick={clicked}>
      <CircularProgress color="inherit" />
    </MuiBackdrop>
  );
};

export default Backdrop;
