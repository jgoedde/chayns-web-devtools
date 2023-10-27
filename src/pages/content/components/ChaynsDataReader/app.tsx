import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    window.addEventListener('message', data => {
      if (!data.data.includes('TobitAccessToken')) return;
      const invokeCallResult = JSON.parse(data.data.replace('chayns.ajaxTab.jsoncall:', ''))?.retVal;

      console.log(invokeCallResult);

      void chrome.runtime.sendMessage({ data: invokeCallResult });
    });

    return () => {
      window.removeEventListener('message', () => {
        console.info('removed event listener');
      });
    };
  }, []);

  return <div />;
}
