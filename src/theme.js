import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';


export default createMuiTheme({
  palette: {
    primary: pink,
    secondary: indigo, // Indigo is probably a good match with pink
    custom: red
  }
});
