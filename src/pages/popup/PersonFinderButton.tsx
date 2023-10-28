import { Accordion, Alert, Avatar, Button, Center, Group, Modal, TextInput, Text, Table } from '@mantine/core';
import { IconInfoCircle, IconUserSearch } from '@tabler/icons-react';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import useSWR from 'swr';
import { useTobitAccessTokenStorage } from '@src/shared/hooks/useTobitAccessTokenStorage';
import { CopyableDataRow } from '@pages/popup/CopyableDataRow';

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

const fetcher = ([url, token]) =>
  fetch(url, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then(res => res.json());

export function PersonFinderButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 200);
  const [accessToken] = useTobitAccessTokenStorage();

  const { data, isLoading, mutate, isValidating, error } = useSWR<{
    list: {
      personId: string;
      userId: number;
      firstName: string;
      lastName: string;
      relationCount: number;
      score: number;
      verified: boolean;
    }[];
    count: number;
  }>([`https://relations.chayns.net/relations/v2/person?skip=0&take=5&query=${debounced}`, accessToken], fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <TextInput label={'Person suchen'} value={value} onChange={e => setValue(e.currentTarget.value)} />
        {error != null ? (
          <Alert variant={'light'} color={'red'} title={'Personen'} icon={<IconInfoCircle />}>
            Die Liste der Personen konnte nicht abgerufen werden. Vermutlich ist dein Access Token abgelaufen.
          </Alert>
        ) : (
          <Accordion>
            {(data?.list ?? []).map(p => (
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
      </Modal>
      <Center>
        <Button onClick={open} variant={'subtle'} rightSection={<IconUserSearch size={14} />}>
          Person finden
        </Button>
      </Center>
    </>
  );
}
