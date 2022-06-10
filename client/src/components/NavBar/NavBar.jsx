import React, { useState } from 'react';
import {
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
import { logout } from '../../actions/auth';
import useStyles from './styles';
import { parseUsernameInitials } from '../../utility/index.js';

const NavBar = ({ searchText, setSearchText, disableSearch }) => {
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

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          className={classes.title + ' fw-bolder fst-italic'}
        >
          MEMORIES
        </Typography>
        <div className="d-flex">
          {disableSearch ? null : (
            <InputBase
              placeholder="Search…"
              value={searchText}
              onChange={handleSearchTextChange}
              className={classes.searchBar}
              inputProps={{ 'aria-label': 'search' }}
            />
          )}

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
  );
};

export default NavBar;
