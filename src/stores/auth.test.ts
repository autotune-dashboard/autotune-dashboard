jest.mock('../../__mocks__/aws-sdk.mock.ts');

import { authStore } from './auth';

describe('auth', () => {
  it('authorize', async () => {
    console.log('test');

    await authStore.login('test', 'test');
  });
});