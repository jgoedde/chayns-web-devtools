import { useEffect, useState } from 'react';
import { useChaynsStorage } from '@src/shared/hooks/useChaynsStorage';

export function useChaynsEnvData() {
  const [isTimeout, setIsTimeout] = useState<boolean>(false);

  const [data] = useChaynsStorage();

  useEffect(() => {
    setTimeout(() => {
      setIsTimeout(true);
    }, 5000);

    return () => {
      chrome.runtime.onMessage.removeListener(() => {});
      setIsTimeout(false);
    };
  }, []);

  useEffect(() => {
    if (data.lastQueryTime) {
      setIsTimeout(false);

      setTimeout(() => {
        setIsTimeout(true);
      }, 5000);
    }
  }, [data.lastQueryTime]);

  return {
    data,
    isWaiting: !isTimeout && !data.isChayns,
  };
}
