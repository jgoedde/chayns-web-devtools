import { createChromeStorageStateHookLocal } from 'use-chrome-storage';

export const useChaynsStorage = createChromeStorageStateHookLocal('chayns-data', { isChayns: false } as {
  lastQueryTime?: number;
} & (ChaynsAndAuthorized | ChaynsNotAuthorized | NoChayns));

type NoChayns = {
  isChayns: false;
};

type Chayns = {
  isAuthorized: boolean;
  isChayns: true;
  siteId: string;
  pageId: number;
  locationId: number;
  domain: string;
};

type ChaynsNotAuthorized = Chayns & {
  isAuthorized: false;
};

type ChaynsAndAuthorized = Chayns & {
  isAuthorized: true;
  tobitAccessToken: string;
  tobitUserId: number;
  firstName: string;
  lastName: string;
  personId: string;
};
