import { useChaynsSiteDataStorage } from '@src/shared/hooks/useChaynsSiteDataStorage';
import { useEffect } from 'react';

export default function App() {
  const [, setChaynsData] = useChaynsSiteDataStorage();

  function getChaynsData() {
    const scripts = document.querySelectorAll('script');
    let cwScript: HTMLScriptElement | null = null;
    scripts.forEach(script => {
      if (script.innerHTML.includes('window.cwInfo')) cwScript = script;
    });

    if (cwScript == null) throw new Error('Could not find chayns data script');

    return JSON.parse(cwScript.textContent.replace('window.cwInfo = ', ''));
  }

  function getPageData() {
    const scripts = document.querySelector('#__CHAYNS_DATA__');

    if (scripts == null) throw new Error('Could not find page data script');

    return JSON.parse(scripts.textContent);
  }

  useEffect(() => {
    chrome.runtime.onMessage.addListener(request => {
      if (request.message !== 'getChaynsData') {
        return;
      }

      try {
        const chaynsData = getChaynsData();
        const pageData = getPageData();

        setChaynsData({
          isChayns: true,
          domain: chaynsData.site.domain,
          firstName: chaynsData.user?.firstName,
          isAuthorized: chaynsData.user != null,
          lastName: chaynsData.user?.lastName,
          locationId: chaynsData.site.locationId,
          pageId: pageData.currentPage.id,
          personId: chaynsData.user?.personId,
          siteId: pageData.currentPage.siteId,
          tobitAccessToken: chaynsData.user?.tobitAccessToken,
          tobitUserId: chaynsData.user?.id,
        });
      } catch (e) {
        setChaynsData({
          isChayns: false,
        });
      }
    });

    return () => {
      chrome.runtime.onMessage.removeListener(() => {});
    };
  }, []);

  return <div />;
}
