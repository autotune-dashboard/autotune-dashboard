import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/app/app';
import registerServiceWorker from './registerServiceWorker';

import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

import './styles/index.css';

import { theme } from './theme';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
