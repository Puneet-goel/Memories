import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { LinearProgress, Typography } from '@material-ui/core';
import memoriesText from './memoriesText.png';
import { authenticate } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  mainLine: {
    minWidth: '100vw',
    minHeight: '100vh',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    width: '100%',
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const AuthenticationLoading = ({ failure }) => {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const auth = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const jumps = [2, 3, 4];
        const jump = jumps[Math.floor(Math.random() * jumps.length)];
        return prevProgress + jump >= 100 ? 100 : prevProgress + jump;
      });
    }, 300);

    //fix the React memory leak warning
    let cancel = false;

    dispatch(authenticate()).then((data) => {
      if (cancel) return;
      setProgress(85);
      auth.current = data;
    });

    return () => {
      cancel = true;
      clearInterval(timer);
    };
  }, [dispatch]);

  useEffect(() => {
    if (progress >= 100) {
      if (auth.current === false) {
        navigate(failure);
      } else if (auth.current === null) {
        alert(
          'There is some problem while loading resources for you. Check your Internet connection, and try again later.',
        );
        window.location.reload();
      }
    }
  }, [progress, navigate, failure]);

  return (
    <div className={classes.mainLine}>
      <img src={memoriesText} alt="icon" width="100%" />
      <br />
      <BorderLinearProgress variant="determinate" value={progress} />
      <br />
      <Typography variant="body2" color="textSecondary">
        {`${Math.round(progress)}%`}
      </Typography>
    </div>
  );
};

export default AuthenticationLoading;
