import { Box, Group, Text, Tooltip } from '@mantine/core';
import { IconCheck, IconClipboardCopy } from '@tabler/icons-react';
import React from 'react';
import { useClipboard } from '@mantine/hooks';

type Props = { value: number | string };

export function CopyableText({ value }: Props) {
  const { copied, copy } = useClipboard({ timeout: 5000 });

  return (
    <Tooltip
      label={
        <Group>
          <div>{copied ? <IconCheck /> : <IconClipboardCopy />}</div>
          <Text>{copied ? 'Kopiert!' : 'Kopieren'}</Text>
        </Group>
      }>
      <Box w={150}>
        <Text style={{ cursor: 'pointer' }} onClick={() => copy(value)} truncate={'end'}>
          {value}
        </Text>
      </Box>
    </Tooltip>
  );
}
