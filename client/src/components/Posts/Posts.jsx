import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import SkeletonPost from './SkeletonPost/SkeletonPost.jsx';
import Post from './Post/Post.jsx';
import memoriesVideo from '../../assets/videos/photography.mp4';

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
    <Grid item sm={10} className="m-auto">
      {!posts.length
        ? [1, 2, 3, 4, 5].map((cur) => (
            <Grid key={cur}>
              <SkeletonPost />
            </Grid>
          ))
        : searchedPosts.map((post, index) => (
            <Grid key={post._id} className="mb-4">
              {index === 1 && (
                <video
                  className="w-100 mb-4"
                  controls
                  autoPlay={true}
                  muted
                  loop
                >
                  <source src={memoriesVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <Post
                post={post}
                toastID={toastID}
                setCurrentId={setCurrentId}
                username={profile.username}
              />
            </Grid>
          ))}
    </Grid>
  );
};

export default Posts;
