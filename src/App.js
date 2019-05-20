import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Calculadora from './components/Calculadora';
import OrdemServico from './components/OrdemServico';

const theme = createMuiTheme({
  
  palette: {
    primary: {
      main:'#D50000'
    },
    secondary: {
      main: '#CCCCCC',
    },
    typography: {
      useNextVariants: true
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Calculadora /> 
        {/* <OrdemServico />*/}
      </MuiThemeProvider>
    );
  }
}

export default App;
