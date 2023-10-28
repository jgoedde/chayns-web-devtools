import React, { useState } from 'react';
import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export function NotLoggedInAlert() {
  const [isShown, setIsShown] = useState(true);

  if (!isShown) return null;

  return (
    <Alert
      withCloseButton
      onClose={() => setIsShown(false)}
      variant={'light'}
      title={'Information'}
      mt={'md'}
      icon={<IconInfoCircle />}>
      Du bist auf dieser Site nicht angemeldet.
    </Alert>
  );
}
