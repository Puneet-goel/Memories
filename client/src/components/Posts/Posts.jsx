import React from "react";
import { useSelector } from "react-redux"; 
import { Grid } from "@material-ui/core";
import SkeletonPost from "./SkeletonPost/SkeletonPost.jsx"; 
import Post from "./Post/Post.jsx";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
	const posts = useSelector((state) => state.posts);
	const user = useSelector((state) => state.user);

	const classes = useStyles();
	
	return (
			(!posts.length)
			?<Grid className={classes.container}  container alignItems="stretch" spacing={3} >
				{
					[1,2,3,4].map((cur) => (
						<Grid key={cur} item xs={12} sm={6}>
							<SkeletonPost />
						</Grid>
					))
				}
			</Grid>
			:<Grid className={classes.container}  container alignItems="stretch" spacing={3} >
			{
				posts.map((post) => (
					<Grid key={post._id} item xs={12} sm={6}>
						<Post post={post} setCurrentId={setCurrentId} username={user.username}/>
					</Grid>
				))
			}
			</Grid>
	);
}

export default Posts;