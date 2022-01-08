import { makeStyles } from "@material-ui/core/styles";

const stringToColor = () => {

	const string = localStorage.getItem('username');
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.substr(-2);
	}
	/* eslint-enable no-bitwise */
	return color;
}


export default makeStyles((theme) => ({
	home: {
		padding: '0',
		backgroundColor: 'white',
		minHeight: "100vh",
		minWidth: "100vw",
	}, 
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	avatar: {
		width: '45px',
		height: '45px',
		backgroundColor: stringToColor(),
	},
	[theme.breakpoints.down("xs")]: {
		mainContainer: {
			flexDirection: "column-reverse",
		}
	}
}));