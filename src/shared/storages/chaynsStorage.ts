import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
import { z } from 'zod';

export type ChaynsAuthorizedStorageData = z.infer<typeof ChaynsAuthorizedStorageDataSchema>;

export const ChaynsAuthorizedStorageDataSchema = z.object({
  tobitAccessToken: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  personId: z.string(),
  userId: z.number(),
});

export type BaseChaynsStorageData = z.infer<typeof BaseChaynsStorageDataSchema>;

export const BaseChaynsStorageDataSchema = z.object({
  siteId: z.string(),
  pageId: z.number(),
});

export type NonChaynsSiteStorageData = {};

export type ChaynsStorageData =
  | NonChaynsSiteStorageData
  | ((BaseChaynsStorageData & ChaynsAuthorizedStorageData) | BaseChaynsStorageData);

export const ChaynsStorageDataSchema = z.union([BaseChaynsStorageDataSchema, ChaynsAuthorizedStorageDataSchema]);

type ChaynsStorage = BaseStorage<ChaynsStorageData> & {
  setValue: (value: ChaynsStorageData) => void;
};

const storage = createStorage<ChaynsStorageData>('chayns-storage-key', undefined, {
  storageType: StorageType.Local,
});

export const chaynsStorage: ChaynsStorage = {
  ...storage,
  setValue: value => {
    void storage.set(value);
  },
};
