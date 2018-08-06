import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

const styles = (({ palette, spacing }: Theme) => createStyles({
  root: {
    flexGrow: 1
  },
  left: {
    backgroundColor: palette.primary.dark
  },
  right: {
    backgroundColor: palette.secondary.dark
  }
}));

interface IAuthProps extends WithStyles<typeof styles>, RouteComponentProps<{}> {
}

export const Auth = withStyles(styles)(
  class AuthComponent extends React.Component<IAuthProps> {
    public render() {
      const { classes } = this.props;
      return (
        <Grid className={classes.root} container spacing={16}>
          <Grid className={classes.left} item xs={12} md={6}>
            1
          </Grid>
          <Grid className={classes.right} item xs={12} md={6}>
            2
          </Grid>
        </Grid>
      );
    }
  }
);
