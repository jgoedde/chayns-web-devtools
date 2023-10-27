import React, { useEffect, useState } from 'react';
import { useChaynsStorage } from '@src/shared/hooks/useChaynsStorage';
import { showNotification } from '@mantine/notifications';
import { useTobitAccessTokenStorage } from '@src/shared/hooks/useTobitAccessTokenStorage';
import { Text } from '@mantine/core';

export function useChaynsEnvData() {
  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const [data] = useChaynsStorage(); // assuming it from some custom hooks or module
  const [, setAccessToken] = useTobitAccessTokenStorage();

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
    if (data.lastQueryTime) {
      setIsTimeout(false);
      setupTimeout();
    }
  }, [data.lastQueryTime]);

  useEffect(() => {
    if (data.isChayns && data.isAuthorized) {
      setAccessToken(data.tobitAccessToken);
      showNotification({
        title: 'Chayns detected!',
        message: (
          <Text size={'xs'}>
            Dein AccessToken wurde gespeichert. Dadurch kannst Du nun den Person- und LocationFinder nutzen, auch wenn
            Du Dich nicht auf einer chayns page befindest.
          </Text>
        ),
      });
    }
  }, [data, setAccessToken]);

  return {
    data,
    isWaiting: !isTimeout && !data.isChayns,
  };
}
