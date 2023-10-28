import { createChromeStorageStateHookLocal } from 'use-chrome-storage';

/**
 * Creates a state hook for managing Tobit access token storage.
 * Lives locally for the extension. If uninstalled, the data is lost.
 *
 * @example
 * const [tokenStorage, setTokenStorage] = useTobitAccessTokenStorage();
 */
export const useTobitAccessTokenStorage = createChromeStorageStateHookLocal('tobit-access-token', {
  saveTime: undefined,
  accessToken: undefined,
} as TobitAccessTokenStorage);

type TobitAccessTokenStorage = {
  accessToken?: string;
  saveTime?: number;
};
