import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Logo } from '@ui/logo';

import { setStateValue, ChangeEvent, FetchState } from '@utils';
import { authStore } from '@stores';

const styles = (({ palette, spacing }: Theme) => createStyles({
  root: {
    flexGrow: 1
  },
  left: {
    display: 'flex',
    flexFlow: 'column'
  },
  right: {
    backgroundColor: palette.secondary.dark
  },
  wrapper: {
    flexGrow: 1
  },
  container: {
    maxWidth: 320
  },
  formItem: {
    marginBottom: spacing.unit * 2,
    width: '100%'
  },
  title: {
    marginBottom: spacing.unit * 4
  },
  logo: {
    marginRight: spacing.unit * 2
  },
  authorized: {
    marginBottom: spacing.unit
  },
  button: {
    marginTop: spacing.unit * 2,
    width: '100%'
  }
}));

interface IAuthProps extends WithStyles<typeof styles>, RouteComponentProps<{}> {
}

interface IAuthState {
  email?: string;
  password?: string;
}

export const Auth = withStyles(styles)(observer(
  class AuthComponent extends React.Component<IAuthProps, IAuthState> {
    constructor(props: IAuthProps) {
      super(props);
      this.state = {
        email: '',
        password: ''
      };
    }

    public render() {
      const { classes } = this.props;
      const { email, password } = this.state;
      const { state, error } = authStore;
      const isLoading = state === FetchState.Loading;
      const isFailed = state === FetchState.Error;
      return (
        <Grid className={classes.root} container>
          <Grid className={classes.left} item xs={12} md={7}>
            <Grid className={classes.wrapper} container justify='center' alignItems='center' direction='column'>
              <Grid className={classes.container} container justify='space-around' alignItems='flex-start' direction='column'>
                <Grid className={classes.title} container alignItems='center' direction='row'>
                  <Logo className={classes.logo} />
                  <Typography variant='display1'>
                    autotune
                  </Typography>
                </Grid>
                {
                  isLoading
                    ? (<LinearProgress />)
                    : null
                }
                {
                  isFailed
                    ? (<Typography variant='subheading' color='error'>
                      {error}
                    </Typography>)
                    : null
                }
                {
                  authStore.isAuthorized
                    ? (<>
                      <Typography variant='body1'>Authorized as <b>{authStore.data.username}</b></Typography>
                      <Button className={classes.button} disabled={isLoading} variant='contained' color='primary' onClick={this.logout}>Logout</Button>
                    </>)
                    : (<>
                      <TextField disabled={isLoading} className={classes.formItem} label='email' type='email' value={email} onChange={this.setEmail} />
                      <TextField disabled={isLoading} className={classes.formItem} label='password' type='password' value={password} onChange={this.setPassword} />
                      <Button className={classes.button} disabled={isLoading} variant='contained' color='primary' onClick={this.login}>Login</Button>
                    </>)
                }
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.right} item xs={12} md={5} />
        </Grid>
      );
    }

    private setEmail = (event: ChangeEvent) => this.setState(setStateValue('email', event.target.value));

    private setPassword = (event: ChangeEvent) => this.setState(setStateValue('password', event.target.value));

    private login = () => authStore.login(this.state.email!, this.state.password!);

    private logout = () => authStore.logout();
  }
));
