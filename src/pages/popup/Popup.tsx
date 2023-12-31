import React, { Fragment } from 'react';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { NoChaynsEnvFound } from '@pages/popup/chayns-env/NoChaynsEnvFound';
import { useChaynsEnvData } from '@pages/popup/chayns-env/useChaynsEnvData';
import { Anchor, Avatar, Box, Button, Center, Divider, Group, Table, Text, Title } from '@mantine/core';
import { CopyableDataRow } from '@pages/popup/copyable/CopyableDataRow';
import { PersonFinderButton } from '@pages/popup/person-finder/PersonFinderButton';
import { LocationFinderButton } from '@pages/popup/location-finder/LocationFinderButton';
import { AccessTokenStatus } from '@pages/popup/access-token/AccessTokenStatus';
import { useIsAccessTokenAvailable } from '@pages/popup/access-token/useIsAccessTokenAvailable';
import { NotLoggedInAlert } from '@pages/popup/NotLoggedInAlert';
import { IconBrandGithub } from '@tabler/icons-react';

const Popup = () => {
  const { data } = useChaynsEnvData();
  const isAccessTokenAvailable = useIsAccessTokenAvailable();

  const renderNoChaynsEnvFound = () => {
    return <NoChaynsEnvFound />;
  };

  const renderData = () => {
    if (!data.isChayns) throw new Error('Data is not valid');

    return (
      <div>
        <Center mt={'sm'}>
          <Group>
            <Avatar src={'https://sub60.tobit.com/l/' + data.siteId + '?size=300'} radius={'sm'} />
            <Anchor href={'https://' + data.domain} target={'_blank'}>
              <Title size={'h2'}>{data.domain}</Title>
            </Anchor>
          </Group>
        </Center>

        {!data.isAuthorized && <NotLoggedInAlert />}

        <Table mt={'md'}>
          <Table.Tbody>
            <CopyableDataRow label={'LocationId'} value={data.locationId} />
            <CopyableDataRow label={'SiteId'} value={data.siteId} />
            <CopyableDataRow label={'PageId'} value={data.pageId} />
            <CopyableDataRow label={'LocationPersonId'} value={data.locationPersonId} />
            <CopyableDataRow label={'Domain'} value={data.domain} />
          </Table.Tbody>
        </Table>

        {data.isAuthorized && (
          <>
            <Divider
              my="xs"
              label={
                <Group>
                  <Avatar src={'https://sub60.tobit.com/u/' + data.personId + '?size=300'} radius={'sm'} />{' '}
                  {data.firstName} {data.lastName}
                </Group>
              }
              labelPosition="center"
            />
            <Table>
              <Table.Tbody>
                <CopyableDataRow label={'PersonId'} value={data.personId} />
                <CopyableDataRow label={'UserId'} value={data.tobitUserId} />
                <CopyableDataRow label={'Access Token'} value={data.tobitAccessToken} />
              </Table.Tbody>
            </Table>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <Box my={'md'}>
        <AccessTokenStatus />
      </Box>
      {!data.isChayns && renderNoChaynsEnvFound()}
      {data.isChayns && renderData()}
      {isAccessTokenAvailable && (
        <Box mt={'md'}>
          <PersonFinderButton />
          <LocationFinderButton />
        </Box>
      )}
      <Box mt={'md'}>
        <Divider />
        <Group>
          <Text size={'sm'} c={'#999'}>
            © 2023 | Julian Gödde
          </Text>
          <Button
            variant={'subtle'}
            c={'gray'}
            leftSection={<IconBrandGithub />}
            onClick={() => {
              void chrome.tabs.create({
                url: 'https://github.com/jgoedde/chayns-web-devtools',
              });
            }}>
            Github
          </Button>
        </Group>
      </Box>
    </>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
