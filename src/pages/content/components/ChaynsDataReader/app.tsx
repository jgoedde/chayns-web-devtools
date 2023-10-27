import { useEffect } from 'react';
import humps from 'lodash-humps';

export default function App() {
  useEffect(() => {
    void chrome.runtime.sendMessage({
      data: 'waiting for chayns data',
      type: 'chayns/waitingForData',
    });

    window.addEventListener('message', data => {
      if (!data.data.includes('TobitAccessToken')) return;
      void chrome.runtime.sendMessage({
        type: 'chayns/dataReceived',
        data: humps(JSON.parse(data.data.replace('chayns.ajaxTab.jsoncall:', ''))?.retVal),
      });
    });

    return () => {
      window.removeEventListener('message', () => {
        console.info('removed event listener');
      });
    };
  }, []);

  return <div />;
}
