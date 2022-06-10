import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import SkeletonPost from './SkeletonPost/SkeletonPost.jsx';
import Post from './Post/Post.jsx';
import useStyles from './styles';

const Posts = ({ setCurrentId, searchText }) => {
  const classes = useStyles();

  const posts = useSelector((state) => state.posts);
  const profile = useSelector((state) => state.profile);

  const searchedPosts = posts.filter((post) => {
    const pattern = searchText.toLowerCase().trim();
    if (pattern === '') return true;
    if (post.title.includes(pattern)) return true;
    if (post.message.includes(pattern)) return true;
    if (post.creator.includes(pattern)) return true;
    for (let i = 0; i < post.tags.length; i++) {
      if (post.tags[i].includes(pattern)) return true;
    }
    return false;
  });

  return !posts.length ? (
    <Grid className={classes.container} container alignItems="stretch">
      {[1, 2, 3, 4, 5].map((cur) => (
        <Grid key={cur} item xs={12}>
          <SkeletonPost />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Grid className={classes.container} container alignItems="stretch">
      {searchedPosts.map((post) => (
        <Grid key={post._id} item xs={12} className="my-2">
          <Post
            post={post}
            setCurrentId={setCurrentId}
            username={profile.username}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
