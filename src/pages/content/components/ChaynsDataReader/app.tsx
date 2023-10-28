import { useChaynsSiteDataStorage } from '@src/shared/hooks/useChaynsSiteDataStorage';
import { useEffect } from 'react';

export default function App() {
  const [, setChaynsData] = useChaynsSiteDataStorage(); // Use the hook to set the chayns data so the popup is synced.

  /**
   * Retrieves chayns data from the current document.
   * Caution: This function is not very reliable and may break in the future.
   *
   * @throws {Error} If the chayns data script could not be found.
   */
  function getChaynsData() {
    const scripts = document.querySelectorAll('script');
    let cwScript: HTMLScriptElement | null = null;
    scripts.forEach(script => {
      if (script.innerHTML.includes('window.cwInfo')) cwScript = script;
    });

    if (cwScript == null) throw new Error('Could not find chayns data script');

    return JSON.parse(cwScript.textContent.replace('window.cwInfo = ', ''));
  }

  /**
   * Retrieves the current page ID.
   *
   * Caution: This function is not very reliable and may break in the future.
   *
   * @returns {number} The current page ID.
   * @throws {Error} If the tappId attribute is not found.
   */
  function getCurrentPageId(): number {
    const tappId = document
      .querySelectorAll('div[data-portal-tappid]')?.[0]
      .attributes.getNamedItem('data-portal-tappid').value;
    if (tappId == null) throw new Error('Could not find tappId');

    return Number(tappId);
  }

  useEffect(() => {
    // Wait for incoming messages from the popup.
    // When the popup opens, this message is emitted, and we query for all the data and set it in the storage.
    chrome.runtime.onMessage.addListener(request => {
      if (request.message !== 'getChaynsData') {
        return;
      }

      try {
        const chaynsData = getChaynsData();

        setChaynsData({
          isChayns: true,
          domain: chaynsData.site.domain,
          firstName: chaynsData.user?.firstName,
          isAuthorized: chaynsData.user != null,
          lastName: chaynsData.user?.lastName,
          locationId: chaynsData.site.locationId,
          pageId: getCurrentPageId(),
          personId: chaynsData.user?.personId,
          siteId: chaynsData.site.id,
          tobitAccessToken: chaynsData.user?.tobitAccessToken,
          tobitUserId: chaynsData.user?.id,
        });
      } catch (e) {
        // This is the case when the page is not a chayns site. But may also occur in the future if the chayns data script is changed.
        console.error(e);
        setChaynsData({
          isChayns: false,
        });
      }
    });

    return () => {
      chrome.runtime.onMessage.removeListener(() => {});
    };
  }, [setChaynsData]);

  return <div />;
}
