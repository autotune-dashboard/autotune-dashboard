import * as React from 'react';
import './auth.css';

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Input from '@material-ui/core/Input'

import { authStore, AuthFlow } from '@stores/auth';

export interface IAuthState {
  username: string;
  password: string;
}

export class Auth extends React.Component<{}, IAuthState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  public render() {
    return (
      <Card className="auth">
        <Input name="username" type="email" value={this.state.username} onChange={this.onUsernameChange} />
        <Input name="password" type="password" value={this.state.password} onChange={this.onPasswordChange} />
        <Button variant="contained" color="primary" onClick={this.authenticate}>test</Button>
      </Card>
    );
  }

  private authenticate = async () => {
    const tokens = await authStore.authenticate(AuthFlow.UserPasswordAuth, {
      USERNAME: this.state.username,
      PASSWORD: this.state.password
    });
    console.log(tokens);
  }

  private setInputValue = (key: keyof IAuthState, value: string) => {
    console.log(key, value);
    return this.setState(prev => ({ ...prev, [key]: value }));
  }

  private onUsernameChange = (event: any) => this.setInputValue("username", event.target.value);

  private onPasswordChange = (event: any) => this.setInputValue("password", event.target.value);
}
