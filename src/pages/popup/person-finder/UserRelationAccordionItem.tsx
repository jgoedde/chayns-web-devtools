import { TUseUserRelations } from '@pages/popup/person-finder/useUserRelations';
import { Accordion, Table } from '@mantine/core';
import { AccordionLabel } from '@src/shared/AccordionLabel';
import { CopyableDataRow } from '@pages/popup/copyable/CopyableDataRow';
import React from 'react';

export function UserRelationAccordionItem({ user }: { user: TUseUserRelations['relations'][0] }) {
  return (
    <Accordion.Item value={user.personId}>
      <Accordion.Control>
        <AccordionLabel
          label={`${user.firstName} ${user.lastName}`}
          image={`https://sub60.tobit.com/u/${user.userId}?size=100`}
        />
      </Accordion.Control>
      <Accordion.Panel>
        <Table>
          <Table.Tbody>
            <CopyableDataRow label={'PersonId'} value={user.personId} />
            <CopyableDataRow label={'UserId'} value={user.userId} />
          </Table.Tbody>
        </Table>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
