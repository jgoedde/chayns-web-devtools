import { Table } from '@mantine/core';
import React, { FC } from 'react';
import { CopyableText } from '@pages/popup/copyable/CopyableText';

type Props = {
  label: string;
  value: number | string;
};

// Not happy with that...
export const CopyableDataRow: FC<Props> = ({ label, value }) => {
  return (
    <Table.Tr>
      <Table.Td>{label}</Table.Td>
      <Table.Td
        align={'right'}
        // TODO: Make this configurable
      >
        <CopyableText value={value} />
      </Table.Td>
    </Table.Tr>
  );
};
