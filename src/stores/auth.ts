import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { FetchStore, FetchState } from '@utils';
import { computed } from 'mobx';
import { decode } from "jsonwebtoken";

const rot47 = require('caesar-salad').ROT47.Decipher();
const cognitoAccessKeyID = rot47.crypt("pzxpxd#xt*'&ts{q|(}\"");
const cognitoSecretAccessKey = rot47.crypt("xAC%<Gt;!)G+{:9s)Df*K23Hx@H:{'<:Z>+tKFe*");
export const clientID = "104m4anpa00b724preu1dco9vj";

export const cognito = new CognitoIdentityServiceProvider({
  region: "us-east-2",
  accessKeyId: cognitoAccessKeyID,
  secretAccessKey: cognitoSecretAccessKey
});

export enum AuthFlow {
  UserPasswordAuth = "USER_PASSWORD_AUTH",
  RefreshTokenAuth = "REFRESH_TOKEN_AUTH"
}

export interface IUser {
  username: string;
  accessToken: string;
  refreshToken: string;
  idToken: string;
}

export interface IAuthRequest {
  flow: AuthFlow;
  parameters: CognitoIdentityServiceProvider.AuthParametersType;
}

const STORAGE_KEY = 'auth.user';

export class AuthStore extends FetchStore<IUser, IAuthRequest> {
  private expiration: number;

  constructor() {
    super();
    const user = localStorage.getItem(STORAGE_KEY);
    if (user) {
      try {
        this.setData(JSON.parse(user) as IUser);
      } catch (err) {
        console.log('faled to parse storage');
      }
    }
  }

  @computed
  public get isAuthorized() {
    return this.data && (this.state === FetchState.Success || this.state === FetchState.Loading);
  }

  protected postSuccess() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }

  protected promise(request: IAuthRequest): Promise<IUser> {
    return cognito
      .initiateAuth({
        ClientId: clientID,
        AuthFlow: request.flow,
        AuthParameters: request.parameters
      })
      .promise()
      .then(response => {
        const user = {
          username: request.flow === AuthFlow.UserPasswordAuth
            ? request.parameters.USERNAME
            : this.data.username,
          refreshToken: response.AuthenticationResult!.RefreshToken!,
          accessToken: response.AuthenticationResult!.AccessToken!,
          idToken: request.flow === AuthFlow.UserPasswordAuth
            ? response.AuthenticationResult!.IdToken!
            : this.data.refreshToken
        };
        return user;
      });
  }

  public login(username: string, password: string) {
    return this.fetch({
      flow: AuthFlow.UserPasswordAuth,
      parameters: {
        USERNAME: username,
        PASSWORD: password
      }
    });
  }

  public logout() {
    localStorage.removeItem(STORAGE_KEY);
    this.reset();
  }

  public refresh() {
    return this.fetch({
      flow: AuthFlow.RefreshTokenAuth,
      parameters: {
        REFRESH_TOKEN: this.data.refreshToken
      }
    });
  }

  public checkAuth() {
    if (this.isAuthorized) {
      if (!this.expiration) {
        const { idToken } = this.data;
        const decoded = decode(idToken);
        if (typeof decoded === "object" && decoded !== null && typeof decoded.exp === "number") {
          this.expiration = decoded.exp;
        }
        if (this.expiration <= Date.now() / 1000 + 5) {
          return this.refresh();
        }
      }
    }
    return Promise.resolve(this.data);
  }
}

export const authStore = new AuthStore();

(window as any).auth = authStore;
