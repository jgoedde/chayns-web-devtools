import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import { chaynsStorage } from '@src/shared/storages/chaynsStorage';
import colorLog from '@root/utils/log';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');

chrome.runtime.onMessage.addListener(message => {
  colorLog('Received chayns data from content script', 'success');
  void chaynsStorage.set(message.data);
});

console.log('added listener');
