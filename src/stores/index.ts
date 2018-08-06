import { authStore } from '@stores/auth';
import { appsStore } from '@stores/apps';

export * from '@stores/auth';
export * from '@stores/apps';

export const stores = {
  authStore,
  appsStore
};