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
  InputBase,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import { logout } from '../../actions/auth';
import CreatePost from '../CreatePost/CreatePost.jsx';
import Posts from '../Posts/Posts.jsx';
import useStyles from './styles';
import './styles.css';
import { parseUsernameInitials, parseUsername } from '../../utility/index.js';

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
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
            MEMORIES
          </Typography>
          <div className="d-flex">
            <InputBase
              placeholder="Search…"
              value={searchText}
              onChange={handleSearchTextChange}
              className={classes.searchBar}
              inputProps={{ 'aria-label': 'search' }}
            />
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
              <MenuItem onClick={handleLogout}>Profile</MenuItem>
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
          <Grid item xs={1} />
          <Grid item xs={12} sm={6} md={7} className={classes.postContainer}>
            <Posts setCurrentId={setCurrentId} searchText={searchText} />
          </Grid>
          <Grid item xs={12} sm={5} md={4} className={classes.userContainer}>
            <h2 className="fw-bolder my-3 font-monospace welcome-name">
              Hi {parseUsername()},
            </h2>
            <CreatePost currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Grow>
    </Container>
  );
};

export default Home;
