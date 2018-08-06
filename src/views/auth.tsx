import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';

export class Auth extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <Grid container spacing={16} direction='row' alignItems='center' justify='space-around' style={{ height: '100%' }}>
        <Grid item xs={12} sm={6} md={4}>
          <form noValidate autoComplete='off' style={{ display: 'flex', flexFlow: 'column', margin: 16, flexWrap: 'wrap' }}>
            <TextField margin='dense' name='username' label='email' type='email' />
            <TextField margin='dense' name='password' label='password' type='password' />
            <Button variant='contained' color='primary'>login</Button>
          </form>
        </Grid>
        <Grid item sm={6} md={8}>login</Grid>
      </Grid>
    );
  }
}
