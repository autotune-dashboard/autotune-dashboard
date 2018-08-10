import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';

import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

import { App } from '@ui/app';
import { Root, Auth, Apps } from '@views';
import { stores } from '@stores';

import { theme } from './theme';
import './styles/index.css';

ReactDOM.render((
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Provider {...stores}>
        <App>
          <Redirect from='/' to='/apps' />
          <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/' component={Root}>
              <Route path='/apps' component={Apps} />
            </Route>
          </Switch>
        </App>
      </Provider>
    </Router>
  </MuiThemeProvider>
), document.getElementById('root') as HTMLElement);

registerServiceWorker();
