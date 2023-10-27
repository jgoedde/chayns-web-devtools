import { useEffect } from 'react';
import humps from 'lodash-humps';
import { useChaynsStorage } from '@src/shared/hooks/useChaynsStorage';

export default function App() {
  const [, setData] = useChaynsStorage();
  useEffect(() => {
    setData({ isChayns: false });

    window.addEventListener('message', data => {
      if (!data.data.includes('TobitAccessToken')) return;
      const chaynsInfo = humps(JSON.parse(data.data.replace('chayns.ajaxTab.jsoncall:', ''))?.retVal);

      const isAuthorized = Object.keys(chaynsInfo.appUser).length > 0;

      setData({
        isAuthorized: isAuthorized,
        isChayns: true,
        domain: chaynsInfo.appInfo.domain,
        locationId: chaynsInfo.appInfo.locationId,
        pageId: chaynsInfo.appInfo.tappSelected.id,
        siteId: chaynsInfo.appInfo.siteId,
        ...(isAuthorized && {
          firstName: chaynsInfo.appUser.firstName,
          lastName: chaynsInfo.appUser.lastName,
          personId: chaynsInfo.appUser.personId,
          tobitAccessToken: chaynsInfo.appUser.tobitAccessToken,
          tobitUserId: chaynsInfo.appUser.tobitUserId,
        }),
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
