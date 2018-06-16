import {createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  root: {
    flexGrow: 1,
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Overpass',
      'Merriweather'
    ].join(','),
  },
  palette: {
    primary: {
      main:'#222d3d',
      light:'#7d94b5'
    },
    secondary: {main: '#43bc9a'}
  },
  appContainer: {
    maxWidth: 1170,
  }
});

export default theme;
