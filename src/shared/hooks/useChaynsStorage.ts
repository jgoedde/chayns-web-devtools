import { createChromeStorageStateHookLocal } from 'use-chrome-storage';

export const useChaynsStorage = createChromeStorageStateHookLocal('chayns-data', { isChayns: false } as {
  lastQueryTime?: number;
} & (Chayns | ChaynsAndAuthorized | NoChayns));

type NoChayns = {
  isChayns: false;
};

type Chayns = {
  siteId: string;
  pageId: number;
  isChayns: true;
  locationId: number;
  domain: string;
  isAuthorized: boolean;
};

type ChaynsAndAuthorized = Chayns & {
  tobitAccessToken: string;
  tobitUserId: number;
  firstName: string;
  lastName: string;
  personId: number;
  isAuthorized: true;
};
