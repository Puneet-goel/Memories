import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Grow,
  AppBar,
  Typography,
  Avatar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getPosts } from '../../actions/posts';
import CreatePost from '../CreatePost/CreatePost.jsx';
import Posts from '../Posts/Posts.jsx';
import WelcomeSection from '../WelcomeSection/WelcomeSection.jsx';
import useStyles from './styles';
import { parseUsernameInitials } from '../../utility/index.js';

const Home = ({ setUserValid }) => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setUserValid(false);

    //delete the token cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" className={classes.home}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title + ' fw-bolder fst-italic'}
          >
            {' '}
            MEMORIES{' '}
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className={classes.iconButton}
            >
              <Avatar className={classes.avatar}>
                {parseUsernameInitials()}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Grow in>
        <Grid
          className={classes.mainContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
        >
          <Grid item xs={1} className={classes.userContainer}>
            <div />
          </Grid>
          <Grid item xs={7} className={classes.postContainer}>
            <CreatePost currentId={currentId} setCurrentId={setCurrentId} />
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={4} className={classes.userContainer}>
            <WelcomeSection />
          </Grid>
        </Grid>
      </Grow>
    </Container>
  );
};

export default Home;
