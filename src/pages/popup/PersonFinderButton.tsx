import { Accordion, Alert, Avatar, Box, Button, Center, Group, Modal, Table, Text, TextInput } from '@mantine/core';
import { IconInfoCircle, IconUserSearch } from '@tabler/icons-react';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import { CopyableDataRow } from '@pages/popup/CopyableDataRow';
import { useUserRelations } from '@pages/popup/useUserRelations';
import { CenteredLoader } from '@src/shared/CenteredLoader';

function AccordionLabel({ label, image }: { label: string; image: string }) {
  return (
    <Group wrap="nowrap">
      <Avatar src={image} radius="xl" />
      <div>
        <Text>{label}</Text>
      </div>
    </Group>
  );
}

export function PersonFinderButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 200);

  const { error, isLoading, relations } = useUserRelations(debounced);

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <Box mb={'md'}>
          <TextInput
            label={'Person suchen'}
            placeholder={'PersonId, UserId, Vorname, Nachname'}
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
          />
          {error != null ? (
            <Alert variant={'light'} color={'red'} title={'Personen'} icon={<IconInfoCircle />}>
              Die Liste der Personen konnte nicht abgerufen werden. Vermutlich ist dein Access Token abgelaufen.
            </Alert>
          ) : (
            <>
              {isLoading ? (
                <CenteredLoader />
              ) : (
                <Accordion>
                  {relations.map(p => (
                    <Accordion.Item key={p.personId} value={p.personId}>
                      <Accordion.Control>
                        <AccordionLabel
                          label={`${p.firstName} ${p.lastName}`}
                          image={`https://sub60.tobit.com/u/${p.userId}?size=100`}
                        />
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Table>
                          <Table.Tbody>
                            <CopyableDataRow label={'PersonId'} value={p.personId} />
                            <CopyableDataRow label={'UserId'} value={p.userId} />
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
        <Button onClick={open} variant={'subtle'} rightSection={<IconUserSearch size={14} />}>
          Person finden
        </Button>
      </Center>
    </>
  );
}
