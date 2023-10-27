import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import { chaynsStorage, ChaynsStorageDataSchema } from '@src/shared/storages/chaynsStorage';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');

chrome.runtime.onMessage.addListener(message => {
  console.info('Received chayns data from content script');

  const storageParseResult = ChaynsStorageDataSchema.safeParse(message.data);

  if (!storageParseResult.success) {
    console.error('Invalid chayns data received from content script');
    return;
  }

  void chaynsStorage.set(storageParseResult.data);
});

console.log('added listener');
