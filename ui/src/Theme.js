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
      light:'#4b5668',
      dark: '#000117',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#43bc9a',
      light:'#7aefcb',
      dark: '#008b6c',
      contrastText: '#000000'
    }
  },
  appContainer: {
    maxWidth: 1170,
  }
});

export default theme;
