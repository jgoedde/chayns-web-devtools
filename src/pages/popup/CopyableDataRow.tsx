import { useClipboard } from '@mantine/hooks';
import { Box, Group, Table, Text, Tooltip } from '@mantine/core';
import { IconCheck, IconClipboardCopy } from '@tabler/icons-react';
import React, { FC } from 'react';

type Props = {
  label: string;
  value: number | string;
};

export const CopyableDataRow: FC<Props> = ({ label, value }) => {
  const { copied, copy } = useClipboard({ timeout: 5000 });

  return (
    <Table.Tr>
      <Table.Td>{label}</Table.Td>
      <Table.Td
        style={{ cursor: 'pointer' }}
        align={'right'}
        // TODO: Make this configurable
      >
        <Tooltip
          label={
            <Group>
              <div>{copied ? <IconCheck /> : <IconClipboardCopy />}</div>
              <Text>{copied ? 'Kopiert!' : 'Kopieren'}</Text>
            </Group>
          }>
          <Box w={150}>
            <Text
              onClick={() => {
                copy(value);
              }}
              truncate={'end'}>
              {value}
            </Text>
          </Box>
        </Tooltip>
      </Table.Td>
    </Table.Tr>
  );
};
