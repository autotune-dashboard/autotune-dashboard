import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { Card } from '@material-ui/core';

const styles = (({ palette, spacing }: Theme) => createStyles({
  scroll: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  item: {
    padding: spacing.unit,
    margin: spacing.unit
  }
}));

interface IAppsProps extends WithStyles<typeof styles>, RouteComponentProps<{}> {
}

export const Apps = withStyles(styles)(
  class AppsComponent extends React.Component<IAppsProps> {
    public render() {
      const { classes } = this.props;
      return (
        <div className={classes.scroll}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i, j) => (
            <Card className={classes.item} key={j}>test</Card>
          ))}
        </div>
      );
    }
  });
