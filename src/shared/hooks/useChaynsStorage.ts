import { createChromeStorageStateHookSession } from 'use-chrome-storage';

export const useChaynsStorage = createChromeStorageStateHookSession('chayns-data', { isChayns: false } as {
  lastQueryTime?: number;
} & (ChaynsAndAuthorized | ChaynsNotAuthorized | NoChayns));

export type NoChayns = {
  isChayns: false;
};

export type Chayns = {
  isAuthorized: boolean;
  isChayns: true;
  siteId: string;
  pageId: number;
  locationId: number;
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
