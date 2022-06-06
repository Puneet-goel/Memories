import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import SkeletonPost from './SkeletonPost/SkeletonPost.jsx';
import Post from './Post/Post.jsx';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);

  const classes = useStyles();

  return !posts.length ? (
    <Grid className={classes.container} container alignItems="stretch">
      {[1, 2, 3, 4, 5, 6].map((cur) => (
        <Grid key={cur} item xs={12}>
          <SkeletonPost />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Grid className={classes.container} container alignItems="stretch">
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} className="my-2">
          <Post
            post={post}
            setCurrentId={setCurrentId}
            username={user.username}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
