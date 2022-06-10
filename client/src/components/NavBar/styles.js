import { makeStyles } from '@material-ui/core/styles';
import { stringToColor } from '../../utility/index.js';

export default makeStyles((theme) => ({
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
}));
