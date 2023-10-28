import React from 'react';
import { createRoot } from 'react-dom/client';
import '@pages/popup/index.css';
import Popup from '@pages/popup/Popup';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { attachTwindStyle } from '@src/shared/style/twind';
import { Container, MantineProvider, ScrollArea } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { Notifications } from '@mantine/notifications';

refreshOnUpdate('pages/popup');

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  attachTwindStyle(appContainer, document);
  const root = createRoot(appContainer);
  root.render(
    <MantineProvider>
      <ScrollArea h={470}>
        <Container>
          <Notifications />
          <Popup />
        </Container>
      </ScrollArea>
    </MantineProvider>,
  );

  // Calls the content script to get the chayns data from the page each time the popup is opened
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    void chrome.tabs.sendMessage(tabs[0].id as number, { message: 'getChaynsData' });
  });
}

init();
