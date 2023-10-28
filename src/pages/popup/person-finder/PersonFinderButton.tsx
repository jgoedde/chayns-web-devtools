import { Accordion, Alert, Box, Button, Center, Modal, TextInput } from '@mantine/core';
import { IconInfoCircle, IconUserSearch } from '@tabler/icons-react';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import { useUserRelations } from '@pages/popup/person-finder/useUserRelations';
import { CenteredLoader } from '@src/shared/CenteredLoader';
import { UserRelationAccordionItem } from '@pages/popup/person-finder/UserRelationAccordionItem';

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
                    <UserRelationAccordionItem key={p.personId} user={p} />
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
