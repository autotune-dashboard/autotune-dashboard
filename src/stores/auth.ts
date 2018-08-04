import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { observable, action } from 'mobx';

const rot47 = require('caesar-salad').ROT47.Decipher();
const cognitoAccessKeyID = rot47.crypt("pzxpxd#xt*'&ts{q|(}\"");
const cognitoSecretAccessKey = rot47.crypt("xAC%<Gt;!)G+{:9s)Df*K23Hx@H:{'<:Z>+tKFe*");
export const clientID = "104m4anpa00b724preu1dco9vj";

export const cognito = new CognitoIdentityServiceProvider({
  region: "us-east-2",
  accessKeyId: cognitoAccessKeyID,
  secretAccessKey: cognitoSecretAccessKey
});

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
  idToken: string;
};

export interface IUserInfo {
  username: string;
  password?: string;
  tokens?: IAuthTokens;
};

export enum AuthFlow {
  UserPasswordAuth = "USER_PASSWORD_AUTH",
  RefreshTokenAuth = "REFRESH_TOKEN_AUTH"
}

export class AuthStore {
  @observable
  public refreshToken: string;

  @observable
  public accessToken: string;

  @observable
  public idToken: string;

  @action
  public async authenticate(flow: AuthFlow, parameters: CognitoIdentityServiceProvider.AuthParametersType) {
    const response = await cognito
      .initiateAuth({
        ClientId: clientID,
        AuthFlow: flow,
        AuthParameters: parameters
      })
      .promise();

    if (
      response.AuthenticationResult === undefined ||
      typeof response.AuthenticationResult!.AccessToken !== "string" ||
      typeof response.AuthenticationResult!.IdToken !== "string"
    ) {
      throw new Error(`Could not authenticate: ${JSON.stringify(response)}`);
    }

    this.refreshToken = response.AuthenticationResult!.RefreshToken!;
    this.accessToken = response.AuthenticationResult!.AccessToken!;
    this.idToken = response.AuthenticationResult!.IdToken!;
  }
}

export const authStore = new AuthStore();