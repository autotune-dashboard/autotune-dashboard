import * as React from 'react';
import Avatar, { AvatarProps } from '@material-ui/core/Avatar';
const icon = require('../assets/logo-small.svg');

export class Logo extends React.Component<AvatarProps> {
  public render() {
    return <Avatar {...this.props} src={icon} />
  }
}