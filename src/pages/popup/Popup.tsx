import React, { useEffect, useState } from 'react';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

const Popup = () => {
  const [data, setData] = useState<{
    isWaiting: boolean;
    tobitAccessToken?: string;
    tobitUserId?: number;
    firstName?: string;
    lastName?: string;
    personId?: number;
    siteId?: string;
    pageId?: number;
    locationId?: number;
  }>({
    isWaiting: true,
  });

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      setData({
        isWaiting: false,
        firstName: request.data.appUser?.firstName,
        lastName: request.data.appUser?.lastName,
        locationId: request.data.appInfo.locationId,
        pageId: request.data.appInfo.tappSelected.id,
        personId: request.data.appUser?.personId,
        siteId: request.data.appInfo.siteId,
        tobitAccessToken: request.data.appUser?.tobitAccessToken,
        tobitUserId: request.data.appUser?.tobitUserId,
      });
    });

    return () => {
      chrome.runtime.onMessage.removeListener(() => {});
    };
  }, []);

  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
