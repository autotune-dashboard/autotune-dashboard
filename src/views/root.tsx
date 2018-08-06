import * as React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';

@observer
export class Root extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <Grid container>
        <Button>logout</Button>
        {this.props.children}
      </Grid>
    );
  }
}