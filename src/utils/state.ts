import * as React from 'react';

export type ChangeEvent<T = string> = React.ChangeEvent<{ value: T }>;

export const setStateValue = <S extends object>(key: keyof S, value: any) => (prevState: S) => {
  return {
    ...(prevState as object),
    [key]: value
  };
}