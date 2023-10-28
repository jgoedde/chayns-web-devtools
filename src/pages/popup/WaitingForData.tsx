import { Center, Loader, Text } from '@mantine/core';
import React from 'react';
import { CenteredLoader } from '@src/shared/CenteredLoader';

export function WaitingForData() {
  return (
    <>
      <Center mt={'xl'}>
        <Text>Warte auf chayns call...</Text>
      </Center>
      <CenteredLoader />
    </>
  );
}
