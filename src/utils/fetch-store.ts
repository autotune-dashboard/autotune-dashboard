import { observable, computed, action } from 'mobx';

export enum FetchState {
  Iddle,
  Loading,
  Error,
  Success
}

export class FetchStore<T, R = {}> {
  @observable
  private featchState: FetchState = FetchState.Iddle;

  @observable
  private responseData: T | undefined;

  @observable
  private errorResponse: Error;

  @computed
  public get state(): FetchState {
    return this.featchState;
  }

  @computed
  public get data(): T {
    return this.responseData!;
  }

  @computed
  public get error(): string {
    return this.errorResponse && this.errorResponse.message;
  }

  protected promise(request?: R): Promise<T | undefined> {
    return Promise.reject(new Error('not implemented'));
  };

  protected postSuccess() {
    // none
  }

  protected postError() {
    // none
  }

  @action
  public fetch(request?: R) {
    this.featchState = FetchState.Loading;
    return this.promise(request)
      .then(this.setData)
      .catch(this.setError)
  }

  @action
  protected setData = (data: T) => {
    this.responseData = data;
    this.featchState = FetchState.Success;
    this.postSuccess();
    return this.data;
  }

  @action
  private setError = (error: Error) => {
    this.errorResponse = error;
    this.featchState = FetchState.Error;
    this.postError();
  }

  @action
  protected reset() {
    this.responseData = undefined;
    this.featchState = FetchState.Iddle;
  }
}