import { Alert } from '@mantine/core';
import { useTobitAccessTokenStorage } from '@src/shared/hooks/useTobitAccessTokenStorage';
import { IconInfoCircle } from '@tabler/icons-react';
import { differenceInDays } from 'date-fns';

export function AccessTokenStatus() {
  const [accessToken] = useTobitAccessTokenStorage();

  if (accessToken.saveTime == null || differenceInDays(new Date(), new Date(accessToken.saveTime)) > 1) {
    return (
      <Alert icon={<IconInfoCircle />} variant={'light'} color={'orange'}>
        Du hast derzeit keinen AccessToken gespeichert oder er ist abgelaufen. Sobald Du eine chayns-Seite aufrufst,
        wird er automatisch aktualisiert.
      </Alert>
    );
  }

  return null;
}
