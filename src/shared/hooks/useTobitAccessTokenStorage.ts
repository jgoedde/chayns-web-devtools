import { createChromeStorageStateHookLocal } from 'use-chrome-storage';

export const useTobitAccessTokenStorage = createChromeStorageStateHookLocal('tobit-access-token', {
  saveTime: undefined,
  accessToken: undefined,
} as TobitAccessTokenStorage);

type TobitAccessTokenStorage = {
  accessToken?: string;
  saveTime?: number;
};
