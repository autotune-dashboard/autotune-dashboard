import * as React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';

const styles = createStyles({
  root: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    height: '100%'
  },
});

interface IAppProps extends WithStyles<typeof styles> {
}

export const App = withStyles(styles)(
  class AppComponent extends React.Component<IAppProps> {
    public render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          {this.props.children}
        </div>
      );
    }
  }
);