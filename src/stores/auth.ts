import { CognitoIdentityServiceProvider } from 'aws-sdk';
// import { observable, action } from 'mobx';
// import { decode } from "jsonwebtoken";

// import { Storage } from './storage';

const rot47 = require('caesar-salad').ROT47.Decipher();
const cognitoAccessKeyID = rot47.crypt("pzxpxd#xt*'&ts{q|(}\"");
const cognitoSecretAccessKey = rot47.crypt("xAC%<Gt;!)G+{:9s)Df*K23Hx@H:{'<:Z>+tKFe*");
export const clientID = "104m4anpa00b724preu1dco9vj";

// const USER_INFO_KEY = 'user_info';

export const cognito = new CognitoIdentityServiceProvider({
  region: "us-east-2",
  accessKeyId: cognitoAccessKeyID,
  secretAccessKey: cognitoSecretAccessKey
});

export enum AuthFlow {
  UserPasswordAuth = "USER_PASSWORD_AUTH",
  RefreshTokenAuth = "REFRESH_TOKEN_AUTH"
}

export interface IUSer {
  username: string;
  accessToken: string;
  refreshToken: string;
}

export class AuthStore {
  public get token(): string {
    return '';
  }

  public async login(username: string, password: string) {
    return {};
  }

  public async logout() {
    return null;
  }
}

// class AuthStoreOld {
//   @observable
//   public username: string;

//   @observable
//   public refreshToken: string;

//   @observable
//   public accessToken: string;

//   @observable
//   public idToken: string;

//   @action
//   public async authenticate(flow: AuthFlow, parameters: CognitoIdentityServiceProvider.AuthParametersType) {
//     const response = await cognito
//       .initiateAuth({
//         ClientId: clientID,
//         AuthFlow: flow,
//         AuthParameters: parameters
//       })
//       .promise();

//     if (
//       response.AuthenticationResult === undefined ||
//       typeof response.AuthenticationResult!.AccessToken !== "string" ||
//       typeof response.AuthenticationResult!.IdToken !== "string"
//     ) {
//       throw new Error(`Could not authenticate: ${JSON.stringify(response)}`);
//     }

//     this.refreshToken = response.AuthenticationResult!.RefreshToken!;
//     this.accessToken = response.AuthenticationResult!.AccessToken!;
//     this.idToken = response.AuthenticationResult!.IdToken!;
//   }

//   @action
//   public async login(username: string, password: string) {
//     Storage.clean();

//     await this.authenticate(AuthFlow.UserPasswordAuth, {
//       USERNAME: username,
//       PASSWORD: password
//     });

//     this.username = username;

//     Storage.set(USER_INFO_KEY, {
//       username,
//       refreshToken: this.refreshToken,
//       accessToken: this.accessToken,
//       idToken: this.idToken
//     });
//   }

//   @action
//   public logout() {
//     this.username = "";
//     this.accessToken = "";
//     this.refreshToken = "";
//     this.idToken = "";

//     Storage.clean();
//   }

//   @action
//   public async refresh() {
//     await this.authenticate(AuthFlow.RefreshTokenAuth, {
//       REFRESH_TOKEN: this.refreshToken
//     });

//     this.setUser();
//   }

//   public getUser() {
//     const user = Storage.get(USER_INFO_KEY);

//     if (user) {
//       this.username = user.username;
//       this.accessToken = user.accessToken;
//       this.refreshToken = user.refreshToken;
//       this.idToken = user.idToken;
//     }

//     return user;
//   }

//   public setUser() {
//     Storage.set(USER_INFO_KEY, {
//       username: this.username,
//       refreshToken: this.refreshToken,
//       accessToken: this.accessToken,
//       idToken: this.idToken
//     });
//   }

//   @action
//   public async isAuthorized() {
//     if (!this.accessToken) {
//       const user = this.getUser();
//       if (!user) {
//         return false;
//       }

//       const decoded = decode(this.idToken);
//       if (typeof decoded === "object" && decoded !== null && typeof decoded.exp === "number") {
//         if (decoded.exp <= Date.now() / 1000 + 5) {
//           await this.refresh();
//         }
//       }
//     }
//     return true;
//   }
// }

export const authStore = new AuthStore();