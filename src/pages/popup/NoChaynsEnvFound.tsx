import { Alert, Anchor } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useChaynsStorage } from '@src/shared/hooks/useChaynsStorage';

export function NoChaynsEnvFound() {
  const [, second] = useChaynsStorage();
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="light" color="yellow" title="Chayns" icon={icon} my={'md'}>
      Es wurde kein chayns Environment auf der aktuellen Page gefunden.{' '}
      <Anchor
        size={'sm'}
        underline={'always'}
        onClick={() => {
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            void chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
            second({ lastQueryTime: Date.now(), isChayns: false });
          });
        }}>
        Erneut versuchen
      </Anchor>
    </Alert>
  );
}
