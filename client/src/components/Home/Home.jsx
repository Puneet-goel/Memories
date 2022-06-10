import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, Grow } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

import CreatePost from '../CreatePost/CreatePost.jsx';
import NavBar from '../NavBar/NavBar.jsx';
import Posts from '../Posts/Posts.jsx';
import useStyles from './styles';
import './styles.css';
import { parseUsername } from '../../utility/index.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const toastID = useRef(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" className={classes.home}>
      <NavBar searchText={searchText} setSearchText={setSearchText} />
      <Grow in>
        <Grid
          className={classes.mainContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
        >
          <Grid item xs={1} />
          <Grid item xs={12} sm={6} md={7} className={classes.postContainer}>
            <Posts
              setCurrentId={setCurrentId}
              searchText={searchText}
              toastID={toastID}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={4} className={classes.userContainer}>
            <h2 className="fw-bolder my-3 font-monospace welcome-name">
              Hi {parseUsername()},
            </h2>
            <CreatePost
              currentId={currentId}
              setCurrentId={setCurrentId}
              toastID={toastID}
            />
          </Grid>
        </Grid>
      </Grow>
      <ToastContainer />
    </Container>
  );
};

export default Home;
