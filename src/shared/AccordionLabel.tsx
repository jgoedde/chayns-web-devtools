import { Avatar, Group, Text } from '@mantine/core';
import React from 'react';

export function AccordionLabel({ label, image }: { label: string; image: string }) {
  return (
    <Group wrap="nowrap">
      <Avatar src={image} radius="xl" />
      <div>
        <Text>{label}</Text>
      </div>
    </Group>
  );
}
