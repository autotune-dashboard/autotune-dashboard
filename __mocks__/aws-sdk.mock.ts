export class CognitoIdentityServiceProviderMock {
  public initiateAuth(params: any) {
    console.log(params);
    return {
      promise: () => Promise.resolve({})
    }
  }
}