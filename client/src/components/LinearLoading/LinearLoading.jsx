import React, { useState, useEffect } from 'react';
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

const LinearLoading = ({ setUserValid }) => {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [jump, setJump] = useState(2);
  const [auth, setAuth] = useState('auth');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const x = await dispatch(authenticate());
      setJump(30);
      setAuth(x);
    })();
  }, [navigate, dispatch]);

  useEffect(() => {
    if (progress >= 100 && auth === false) {
      navigate('/login');
    } else if (progress >= 100 && auth === true) {
      setUserValid(true);
    } else if (progress >= 100) {
      alert(
        'There is some problem while loading resources for you. Check your Internet connection, and try again later.',
      );
      setProgress(0);
      setJump(2);
    }
  }, [progress, auth, navigate, setUserValid]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        return prevProgress >= 100
          ? 100
          : prevProgress + jump >= 100
          ? 100
          : prevProgress + jump;
      });
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, [navigate, dispatch, jump]);

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

export default LinearLoading;
