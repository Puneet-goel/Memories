import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar.jsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ViewPost from './ViewPost.jsx';
import LikedBy from './LikedBy.jsx';
import './style.css';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function a11yProps(index) {
  return {
    id: `post-tab-${index}`,
    'aria-controls': `post-tab-${index}`,
  };
}

const PostTabs = () => {
  const params = useParams();
  const navigate = useNavigate();
  const post = useSelector(
    (state) => state.posts.filter((post) => post._id === params.id)[0]
  );

  const classes = useStyles();
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      className="container-fluid bg-white p-0"
      style={{ backgroundColor: '#f1f1f1' }}
    >
      <NavBar disableSearch={true} />

      <div className="posttabs">
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
          >
            <Tab
              label="Home"
              onClick={(e) => {
                navigate('/');
              }}
              {...a11yProps(0)}
            />
            <Tab label="View Post" {...a11yProps(1)} />
            <Tab label="Liked By" {...a11yProps(2)} />
            <Tab
              label="Edit Post"
              onClick={(e) => {
                navigate('/');
              }}
              {...a11yProps(3)}
            />
          </Tabs>
        </Paper>

        {value === 1 && <ViewPost post={post} />}
        {value === 2 && <LikedBy likes={post?.likedBy || []} />}
      </div>
    </div>
  );
};

export default PostTabs;
