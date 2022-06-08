import { makeStyles } from '@material-ui/core/styles';
import { stringToColor } from '../../utility/index.js';

export default makeStyles((theme) => ({
  home: {
    padding: '0',
    backgroundColor: 'white',
    minHeight: '100vh',
    minWidth: '100vw',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Proxima Nova',
  },
  searchBar: {
    color: 'white',
    padding: '6px',
    background: '#27282c87',
    margin: '5px',
    borderRadius: '4px',
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
    height: 'calc(100vh - 70px)',
    padding: '10px',
  },
  userContainer: {
    padding: '10px',
  },
  [theme.breakpoints.down('xs')]: {
    mainContainer: {
      flexDirection: 'column-reverse',
    },
  },
}));
