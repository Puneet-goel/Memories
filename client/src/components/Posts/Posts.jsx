import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import SkeletonPost from './SkeletonPost/SkeletonPost.jsx';
import Post from './Post/Post.jsx';

const Posts = ({ setCurrentId, searchText, toastID, networkEnabled }) => {

  const posts = useSelector((state) => state.posts);
  const profile = useSelector((state) => state.profile);

  /**
   * @description filter network posts
   */
  const networkPosts = posts.filter((post) => {
    if (!networkEnabled || post.creator === profile.username) return true;
    const isCreatorFollowed = profile.following.includes(post.creator);
    return isCreatorFollowed;
  });

  /**
   * @description filter search posts
   */
  const searchedPosts = networkPosts.filter((post) => {
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

  return (
    <Grid container>
      <Grid item sm={2} />
      <Grid item xs={12} sm={10}>
        {!posts.length?(
          [1, 2, 3, 4, 5].map((cur) => (
            <Grid key={cur} >
              <SkeletonPost />
            </Grid>
          ))
        ): (
          searchedPosts.map((post) => (
            <Grid key={post._id} className="mb-4">
              <Post
                post={post}
                toastID={toastID}
                setCurrentId={setCurrentId}
                username={profile.username}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Grid>
  )
};

export default Posts;
