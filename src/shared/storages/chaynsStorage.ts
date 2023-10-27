import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

export type Chayns = {
  todo: string
}

type ChaynsStorage = BaseStorage<Chayns> & {
  setValue: (value:Chayns) => void;
};

const storage = createStorage<Chayns>('chayns-storage-key', {todo:''}, {
  storageType: StorageType.Local,
});

export const chaynsStorage: ChaynsStorage = {
  ...storage,
  setValue: (value)=>{
    void storage.set(value)
  }
};
