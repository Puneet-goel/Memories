import React, { useState, useEffect } from "react";
import { Container, Grid, Grow, AppBar, Typography, Avatar, Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../actions/posts"
import Form from "../Form/Form.jsx";
import Posts from "../Posts/Posts.jsx";
import useStyles from "./styles";

const Home = ({setUserValid}) => {
	const [currentId, setCurrentId] = useState(null);
	const classes = useStyles();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useSelector((state) => state.user);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleLogout = (e) => {
		e.preventDefault();
        setUserValid(false);

        //delete the token cookie
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/');
	}

	const handleClose = () => {
		setAnchorEl(null);
	};
	
	useEffect(()=>{
		dispatch(getPosts());
	},[dispatch]);

	return (
		<Container maxWidth="lg" className={classes.home}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title + " fw-bolder fst-italic"}> MEMORIES </Typography>
					<div>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<Avatar className={classes.avatar}>{user.username[0]+user.username[1]}</Avatar>
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
							<MenuItem onClick={handleLogout}>Log Out</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		    <Grow in>
		        <Container className="mt-3">
		            <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3} >
		                <Grid item xs={12} sm={8} >
		                    <Posts setCurrentId={setCurrentId}/>
		                </Grid>
		                <Grid item xs={12} sm={4}> 
		                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
		                </Grid>
		            </Grid>
		        </Container>
		    </Grow>
		</Container>
	);
}

export default Home;