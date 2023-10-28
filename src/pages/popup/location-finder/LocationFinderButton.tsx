import { Accordion, Alert, Box, Button, Center, Modal, TextInput } from '@mantine/core';
import { IconBrandFinder, IconInfoCircle } from '@tabler/icons-react';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import { CenteredLoader } from '@src/shared/CenteredLoader';
import { useSiteRelations } from '@pages/popup/location-finder/useSiteRelations';
import { SiteRelationAccordionItem } from '@pages/popup/location-finder/SiteRelationAccordionItem';

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
                    <SiteRelationAccordionItem
                      key={p.siteId}
                      site={p}
                      onClick={() => chrome.tabs.create({ url: `https://chayns.net/${p.siteId}`, active: true })}
                    />
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
