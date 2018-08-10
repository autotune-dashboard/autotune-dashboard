import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = (({ palette, spacing }: Theme) => createStyles({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
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
              <IconButton aria-haspopup='true' color='inherit'>
                <AccountCircle />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Grid>
      );
    }
  }
);
