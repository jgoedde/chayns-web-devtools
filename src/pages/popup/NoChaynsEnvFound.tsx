import { Alert, Anchor } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useChaynsSiteDataStorage } from '@src/shared/hooks/useChaynsSiteDataStorage';

export function NoChaynsEnvFound() {
  const [, setChaynsData] = useChaynsSiteDataStorage();

  return (
    <Alert variant="light" color="yellow" title="Chayns" icon={<IconInfoCircle />} my={'md'}>
      Es wurde kein chayns Environment auf der aktuellen Page gefunden.{' '}
      <Anchor
        size={'sm'}
        underline={'always'}
        onClick={() => {
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            void chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
            setChaynsData({ isChayns: false });
          });
          // Calls the content script to get the chayns data from the page each time the popup is opened
          chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            void chrome.tabs.sendMessage(tabs[0].id as number, { message: 'getChaynsData' });
          });
        }}>
        Erneut versuchen
      </Anchor>
    </Alert>
  );
}
