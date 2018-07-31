import { CognitoIdentityServiceProvider } from 'aws-sdk';

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
  public async authenticate(flow: AuthFlow, parameters: CognitoIdentityServiceProvider.AuthParametersType, refreshToken?: string) {
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
      typeof response.AuthenticationResult!.IdToken !== "string" ||
      (refreshToken === undefined && typeof response.AuthenticationResult!.RefreshToken !== "string")
    ) {
      throw new Error(`Could not authenticate: ${JSON.stringify(response)}`);
    }

    if (refreshToken === undefined) {
      refreshToken = response.AuthenticationResult!.RefreshToken!;
    }

    const tokens: IAuthTokens = {
      accessToken: response.AuthenticationResult!.AccessToken!,
      refreshToken,
      idToken: response.AuthenticationResult!.IdToken!
    };

    return tokens;
  }
}

export const authStore = new AuthStore();