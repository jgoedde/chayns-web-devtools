import { useEffect } from 'react';
import { useChaynsSiteDataStorage } from '@src/shared/hooks/useChaynsSiteDataStorage';
import { showNotification } from '@mantine/notifications';
import { useTobitAccessTokenStorage } from '@src/shared/hooks/useTobitAccessTokenStorage';
import { differenceInDays } from 'date-fns';

export function useChaynsEnvData() {
  const [chaynsEnvData] = useChaynsSiteDataStorage();
  const [accessToken, setAccessToken] = useTobitAccessTokenStorage();

  useEffect(() => {
    if (chaynsEnvData.isChayns && chaynsEnvData.isAuthorized) {
      if (differenceInDays(new Date(), new Date(accessToken.saveTime)) > 1) {
        showNotification({
          title: 'AccessToken aktualisiert',
          message: 'Dein AccessToken wurde aktualisiert.',
          color: 'blue',
          autoClose: 5000,
        });
      }
      setAccessToken({ accessToken: chaynsEnvData.tobitAccessToken, saveTime: Date.now() });
    }
  }, [accessToken.saveTime, chaynsEnvData, setAccessToken]);

  return {
    data: chaynsEnvData,
  };
}
