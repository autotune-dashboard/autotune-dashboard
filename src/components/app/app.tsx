import * as React from 'react';
import './app.css';

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Input from '@material-ui/core/Input'

import { authStore, AuthFlow } from '@stores/auth';

export class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Card>
          <Input />
          <Input />
          <Button variant="contained" color="primary" onClick={this.authenticate}>test</Button>
        </Card>
      </div>
    );
  }

  private authenticate = async () => {
    const tokens = await authStore.authenticate(AuthFlow.UserPasswordAuth, {
      USERNAME: "email",
      PASSWORD: "pass"
    });
    console.log(tokens);
  }
}
