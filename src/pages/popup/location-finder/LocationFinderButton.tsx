import { Accordion, Alert, Anchor, Box, Button, Center, Modal, Table, TextInput } from '@mantine/core';
import { IconBrandFinder, IconInfoCircle } from '@tabler/icons-react';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import { CopyableDataRow } from '@pages/popup/copyable/CopyableDataRow';
import { CenteredLoader } from '@src/shared/CenteredLoader';
import { useSiteRelations } from '@pages/popup/location-finder/useSiteRelations';
import { AccordionLabel } from '@src/shared/AccordionLabel';

export function LocationFinderButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 200);

  const { error, isLoading, relations } = useSiteRelations(debounced);

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <Box mb={'md'}>
          <TextInput
            label={'Location suchen'}
            placeholder={'Domain, SiteId'}
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
          />
          {error != null ? (
            <Alert variant={'light'} color={'red'} title={'Personen'} icon={<IconInfoCircle />}>
              Die Liste der Sites konnte nicht abgerufen werden. Vermutlich ist dein Access Token abgelaufen.
            </Alert>
          ) : (
            <>
              {isLoading ? (
                <CenteredLoader />
              ) : (
                <Accordion>
                  {relations.map(p => (
                    <Accordion.Item key={p.siteId} value={p.siteId}>
                      <Accordion.Control>
                        <AccordionLabel label={`${p.name}`} image={`https://sub60.tobit.com/l/${p.siteId}?size=100`} />
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Table>
                          <Table.Tbody>
                            <CopyableDataRow label={'SiteId'} value={p.siteId} />
                            <CopyableDataRow label={'LocationId'} value={p.locationId} />
                            <Table.Tr>
                              <Table.Td>Site</Table.Td>
                              <Table.Td
                                align={'right'}
                                // TODO: Make this configurable
                              >
                                <Box w={150}>
                                  <Anchor
                                    onClick={() =>
                                      chrome.tabs.create({ url: `https://chayns.net/${p.siteId}`, active: true })
                                    }>
                                    Öffnen
                                  </Anchor>
                                </Box>{' '}
                              </Table.Td>
                            </Table.Tr>
                          </Table.Tbody>
                        </Table>
                      </Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}
            </>
          )}
        </Box>
      </Modal>
      <Center>
        <Button onClick={open} variant={'subtle'} rightSection={<IconBrandFinder size={14} />}>
          Site finden
        </Button>
      </Center>
    </>
  );
}
