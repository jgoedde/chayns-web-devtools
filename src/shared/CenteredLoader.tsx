import { Center, Loader } from '@mantine/core';
import React from 'react';

export function CenteredLoader() {
  return (
    <Center mt={'md'}>
      <Loader />
    </Center>
  );
}
