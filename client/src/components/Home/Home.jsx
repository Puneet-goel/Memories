import React, { useState, useRef } from 'react';
import { Container, Grid, Grow, Switch } from '@material-ui/core';
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
  const [switchState, setSwitchState] = useState(false);

  const toastID = useRef(null);
  const classes = useStyles();

  const handleSwitchChange = (event) => {
    setSwitchState(event.target.checked);
  };

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
              networkEnabled={switchState}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={4} className={classes.userContainer}>
            <h2 className="fw-bolder my-3 font-monospace welcome-name">
              Hi {parseUsername()}, &nbsp;
            </h2>

            <h5 className="fw-bolder my-3 font-monospace welcome-name text-center">
              Welcome to Memories
            </h5>

            <CreatePost
              currentId={currentId}
              setCurrentId={setCurrentId}
              toastID={toastID}
            />

            <div className="text-center mt-4">
              <h5 className="font-monospace pt-3">Your Network Feed only?</h5>
              <Switch
                checked={switchState}
                onChange={handleSwitchChange}
                color="primary"
                name="network-post"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </div>
          </Grid>
        </Grid>
      </Grow>
      <ToastContainer />
    </Container>
  );
};

export default Home;
