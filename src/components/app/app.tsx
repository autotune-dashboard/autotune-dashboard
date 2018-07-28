import * as React from 'react';
import './app.css';

import Button from '@material-ui/core/Button'

export class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Button variant="contained" color="primary">test</Button>
      </div>
    );
  }
}
