import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';

import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

import { App } from '@ui/app';
import { Root, Auth } from '@views';
import { authStore } from '@stores';

import { theme } from './theme';
import './styles/index.css';

@observer
class AppRoot extends React.Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <App>
            <Switch>
              {authStore.isAuthorized
                ? <Redirect exact from='/auth' to='/' />
                : <Redirect exact from='/' to='/auth' />
              }
              <Route exact path='/auth' component={Auth} />
              <Route exact path='/' component={Root} />
            </Switch>
          </App>
        </Router>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<AppRoot />, document.getElementById('root') as HTMLElement);

registerServiceWorker();
