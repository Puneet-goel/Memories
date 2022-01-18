import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import memoriesText from "./memoriesText.png";
import { authenticate } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
	mainLine: {
		minWidth: '100vw',
		minHeight: '100vh',
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: '10px',
		paddingRight: '10px',
	}, 
	line: {
		width: '100%',
	}
}));

const LinearLoading = ({ setUserValid }) => {
	const classes = useStyles();
	const [progress, setProgress] = useState(0);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {

		(async () => {
            const x = await dispatch(authenticate());

			if(!x){
				navigate('/login');
			}
            setUserValid(x);
        })()

		const timer = setInterval(() => {
			setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 20));
		}, 300);

		return () => {
			clearInterval(timer);
		};
	}, [navigate, setUserValid, dispatch]);

	return (
		<div className={classes.mainLine}>
			<img src={memoriesText} alt="icon" width="100%" />
			<br />
			<LinearProgress className={classes.line} variant="determinate" value={progress} />
		</div>
	);
}

export default LinearLoading;