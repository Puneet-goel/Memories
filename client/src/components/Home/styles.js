import { makeStyles } from "@material-ui/core/styles";
import { stringToColor } from "../../utility/index.js";

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
	iconButton: {
		padding: '0',
	},
	avatar: {
		width: '45px',
		height: '45px',
		backgroundColor: stringToColor(),
	},
	postContainer: {
		overflow: 'scroll',
		height: 'calc(100vh - 45px)',
	},
	userContainer: {
		overflow: 'scroll',
		height: 'calc(100vh - 45px)',
	},
	apiContainer: {
		overflow: 'scroll',
		height: 'calc(100vh - 45px)',
	},
	[theme.breakpoints.down("xs")]: {
		mainContainer: {
			flexDirection: "column-reverse",
		}
	}
}));