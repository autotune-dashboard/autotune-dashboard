import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Logo } from '@ui/logo';
import { Apps } from '@views/apps';

const styles = (({ palette, spacing }: Theme) => createStyles({
  root: {
    flexGrow: 1,
    height: '100%'
  },
  flex: {
    flex: 1
  },
  content: {
    flex: 1,
    height: 'calc(100% - 64px)'
  }
}));

interface IRootProps extends WithStyles<typeof styles>, RouteComponentProps<{}> {
}

export const Root = withStyles(styles)(
  class RootComponent extends React.Component<IRootProps> {
    public render() {
      const { classes } = this.props;
      return (
        <Grid className={classes.root} container direction='column'>
          <AppBar position='static'>
            <Toolbar>
              <Logo />
              <div className={classes.flex} />
              <IconButton aria-haspopup='true' color='inherit'>
                <AccountCircle />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            <Switch>
              <Route path='/' component={Apps} />
            </Switch>
          </div>
        </Grid>
      );
    }
  }
);
