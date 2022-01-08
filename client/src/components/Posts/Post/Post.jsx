import React, { useEffect, useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { green, blue } from '@material-ui/core/colors';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from "../../../actions/posts";
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from "./styles";

const Post = ({post, setCurrentId, username}) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [color, setColor] = useState(() => blue[700]);
	const [isLike, setIsLike] = useState(false);

	const handleLikePost = () => {
		dispatch(likePost(post._id));

		if(isLike){
			setColor(blue[700]);
		}else{
			setColor(green[700]);
		}

		setIsLike((like) => !like)
	}

	useEffect(() => {
		const x = post.likedBy.find(peer => peer === username);
		if(x){
			setColor(green[700]);
			setIsLike(true);
		}
	}, [post,username]);

	return (
		<Card className={classes.card}>

			{
				(post.selectedFile === '')?
				<Skeleton animation="wave" className={classes.media} variant="rect"  />:
				<CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
			}
			{
				(post.selectedFile === '')?
				<div className={classes.overlay}>
					<Typography variant="h6" className={classes.dark}>{post.creator}</Typography>
					<Typography variant="body2" className={classes.dark}>{moment(post.createdAt).fromNow()}</Typography>
				</div>
				:<div className={classes.overlay}>
					<Typography variant="h6" >{post.creator}</Typography>
					<Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
				</div>
			}
			{
				(post.creator === username)?
				<div className={classes.overlay2}>
					<Button style={{color: "white"}} size="small" onClick={() => setCurrentId(post._id)}>
						<MoreHorizIcon fontSize="medium" /> 
					</Button>
				</div>
				:null
			}
			<div className={classes.details}>
				<Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} ` )}</Typography>
			</div>
			<Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p" >{post.message.split(' ').splice(0, 20).join(' ')}</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Button size="small" color="primary" onClick={handleLikePost} >
					<ThumbUpAltIcon style={{color: color}} fontSize="small" /> 
					&nbsp;  &nbsp;
					{(post.likedBy)?post.likedBy.length:0}
				</Button>
				{
					(post.creator === username)?
					<Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id, username)) }>
						<DeleteIcon fontSize="small" /> 
						Delete
					</Button>
					:null
				}
				<Link to={`/viewPost/${post._id}`} style={{ textDecoration: 'none' }}> ...see more </Link>
			</CardActions>
		</Card>
	);
}

export default Post;