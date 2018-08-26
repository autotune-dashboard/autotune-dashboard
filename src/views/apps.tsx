import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = (({ palette, spacing }: Theme) => createStyles({
  scroll: {
    flex: 1,
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  item: {
    padding: spacing.unit,
    margin: spacing.unit,
    maxWidth: 800
  },
  add: {
    position: 'fixed',
    bottom: spacing.unit * 2,
    right: spacing.unit * 2
  }
}));

interface IAppsProps extends WithStyles<typeof styles>, RouteComponentProps<{}> {
}

interface IAppsState {
  dialogOpen: boolean;
}

export const Apps = withStyles(styles)(
  class AppsComponent extends React.Component<IAppsProps, IAppsState> {
    constructor(props: IAppsProps) {
      super(props);
      this.state = {
        dialogOpen: false
      };
    }

    public render() {
      const { classes } = this.props;
      return (
        <>
          <div className={classes.scroll}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i, j) => (
              <Card className={classes.item} key={j}>test</Card>
            ))}
          </div>
          <Button variant='fab' color="primary" aria-label="Add" className={classes.add} onClick={this.toggleNewAppDialog}>
            <AddIcon />
          </Button>
        </>
      );
    }

    private toggleNewAppDialog = () => this.setState({ dialogOpen: !this.state.dialogOpen })
  });
