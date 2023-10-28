import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useIsAccessTokenAvailable } from '@pages/popup/access-token/useIsAccessTokenAvailable';

export function AccessTokenStatus() {
  const isAccessTokenAvailable = useIsAccessTokenAvailable();

  if (!isAccessTokenAvailable) {
    return (
      <Alert icon={<IconInfoCircle />} variant={'light'} color={'orange'} data-testid={'access-token-alert'}>
        Du hast derzeit keinen AccessToken gespeichert oder er ist abgelaufen. Sobald Du eine chayns-Seite aufrufst,
        wird er automatisch aktualisiert.
      </Alert>
    );
  }

  return null;
}
