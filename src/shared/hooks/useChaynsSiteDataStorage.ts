import { createChromeStorageStateHookSession } from 'use-chrome-storage';

/**
 * A variable that provides a session-based storage state hook for all the chayns site and page data.
 * It is created using the `createChromeStorageStateHookSession` function.
 * Using a session storage because the data changes any time the user changes the site.
 *
 * @returns {Object} - The created storage state hook.
 */
export const useChaynsSiteDataStorage = createChromeStorageStateHookSession('chayns-data', { isChayns: false } as
  | ChaynsAndAuthorized
  | ChaynsNotAuthorized
  | NoChayns);

export type NoChayns = {
  isChayns: false;
};

export type Chayns = {
  isAuthorized: boolean;
  isChayns: true;
  siteId: string;
  pageId: number;
  locationId: number;
  locationPersonId: string;
  domain: string;
};

export type ChaynsNotAuthorized = Chayns & {
  isAuthorized: false;
};

export type ChaynsAndAuthorized = Chayns & {
  isAuthorized: true;
  tobitAccessToken: string;
  tobitUserId: number;
  firstName: string;
  lastName: string;
  personId: string;
};
