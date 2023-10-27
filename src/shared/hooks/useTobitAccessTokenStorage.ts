import { createChromeStorageStateHookLocal } from 'use-chrome-storage';

export const useTobitAccessTokenStorage = createChromeStorageStateHookLocal('tobit-access-token', '');
