import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
  }
}));

interface IAuthProps extends WithStyles<typeof styles>, RouteComponentProps<{}> {
}

export const Auth = withStyles(styles)(
  class AuthComponent extends React.Component<IAuthProps> {
    public render() {
      const { classes } = this.props;
      return (
        <Grid className={classes.root} container>
          <Grid className={classes.left} item xs={12} md={7}>
            <Grid className={classes.wrapper} container justify='center' alignItems='center' direction='column'>
              <Grid className={classes.container} container justify='space-around' alignItems='flex-start' direction='column'>
                <Typography variant='display1' gutterBottom>
                  Login
                </Typography>
                <TextField className={classes.formItem} label='email' />
                <TextField className={classes.formItem} label='password' />
                <Button variant='contained' color='primary'>Login</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.right} item xs={12} md={5} />
        </Grid>
      );
    }
  }
);
