import { useClipboard } from '@mantine/hooks';
import { Box, Group, Text, Tooltip } from '@mantine/core';
import { IconCheck, IconClipboardCopy } from '@tabler/icons-react';
import React from 'react';
import Element = React.JSX.Element;

type Props = { value: number | string; component: Element };

export function Copyable({ value, component }: Props) {
  const { copied, copy } = useClipboard({ timeout: 5000 });

  return (
    <Tooltip
      label={
        <Group>
          <div>{copied ? <IconCheck /> : <IconClipboardCopy />}</div>
          <Text>{copied ? 'Kopiert!' : 'Kopieren'}</Text>
        </Group>
      }>
      <Box onClick={() => copy(value)}>{component}</Box>
    </Tooltip>
  );
}
