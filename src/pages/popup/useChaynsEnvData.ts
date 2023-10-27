import { useEffect, useState } from 'react';
import { useChaynsStorage } from '@src/shared/hooks/useChaynsStorage';

export function useChaynsEnvData() {
  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const [data] = useChaynsStorage(); // assuming it from some custom hooks or module

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

  return {
    data,
    isWaiting: !isTimeout && !data.isChayns,
  };
}
