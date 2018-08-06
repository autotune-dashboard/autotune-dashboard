import { authStore } from './auth';
import { appsStore } from './apps';

export * from './auth';
export * from './apps';

export const stores = {
  authStore,
  appsStore
};