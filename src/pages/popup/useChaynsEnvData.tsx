import React, { useEffect, useState } from 'react';
import { useChaynsSiteDataStorage } from '@src/shared/hooks/useChaynsSiteDataStorage';
import { showNotification } from '@mantine/notifications';
import { useTobitAccessTokenStorage } from '@src/shared/hooks/useTobitAccessTokenStorage';
import { Text } from '@mantine/core';
import { differenceInDays } from 'date-fns';

export function useChaynsEnvData() {
  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const [chaynsEnvData] = useChaynsSiteDataStorage();
  const [accessToken, setAccessToken] = useTobitAccessTokenStorage();

  const setupTimeout = (delay = 7500) => {
    const timer = setTimeout(() => {
      setIsTimeout(true);
    }, delay);

    // Clear the timer when unmounting.
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    setupTimeout();

    return () => {
      chrome.runtime.onMessage.removeListener(() => {});
      setIsTimeout(false);
    };
  }, []);

  useEffect(() => {
    if (chaynsEnvData.lastQueryTime) {
      setIsTimeout(false);
      setupTimeout();
    }
  }, [chaynsEnvData.lastQueryTime]);

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
    isWaiting: !isTimeout && !chaynsEnvData.isChayns,
  };
}
