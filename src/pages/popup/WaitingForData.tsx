import { Center, Loader, Text } from '@mantine/core';
import React from 'react';

export function WaitingForData() {
  return (
    <>
      <Center mt={'xl'}>
        <Text>Warte auf chayns call...</Text>
      </Center>
      <Center mt={'md'}>
        <Loader size={45} />
      </Center>
    </>
  );
}
