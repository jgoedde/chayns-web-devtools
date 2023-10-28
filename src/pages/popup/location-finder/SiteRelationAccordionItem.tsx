import { TUseSiteRelations } from '@pages/popup/location-finder/useSiteRelations';
import { Accordion, Anchor, Box, Table } from '@mantine/core';
import { AccordionLabel } from '@src/shared/AccordionLabel';
import { CopyableDataRow } from '@pages/popup/copyable/CopyableDataRow';
import React from 'react';

export function SiteRelationAccordionItem({
  onClick,
  site: { locationId, name, siteId },
}: {
  site: TUseSiteRelations['relations'][0];
  onClick: () => Promise<chrome.tabs.Tab>;
}) {
  return (
    <Accordion.Item value={siteId}>
      <Accordion.Control>
        <AccordionLabel label={`${name}`} image={`https://sub60.tobit.com/l/${siteId}?size=100`} />
      </Accordion.Control>
      <Accordion.Panel>
        <Table>
          <Table.Tbody>
            <CopyableDataRow label={'SiteId'} value={siteId} />
            <CopyableDataRow label={'LocationId'} value={locationId} />
            <Table.Tr>
              <Table.Td>Site</Table.Td>
              <Table.Td
                align={'right'}
                // TODO: Make this configurable
              >
                <Box w={150}>
                  <Anchor onClick={onClick}>Öffnen</Anchor>
                </Box>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
