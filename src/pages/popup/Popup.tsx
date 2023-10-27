import React from 'react';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { NoChaynsEnvFound } from '@pages/popup/NoChaynsEnvFound';
import { useChaynsEnvData } from '@pages/popup/useChaynsEnvData';
import { Anchor, Avatar, Center, Divider, Group, PasswordInput, Table, Title } from '@mantine/core';
import { WaitingForData } from '@pages/popup/WaitingForData';
import { CopyableDataRow } from '@pages/popup/CopyableDataRow';
import { IconBrandAuth0, IconUserScan } from '@tabler/icons-react';

const Popup = () => {
  const { data, isWaiting } = useChaynsEnvData();

  if (isWaiting) {
    return <WaitingForData />;
  }

  if (!data.isChayns) return <NoChaynsEnvFound />;

  return (
    <div>
      <Center mt={'sm'}>
        <Anchor href={'https://' + data.domain} target={'_blank'}>
          <Title size={'h2'}>{data.domain}</Title>
        </Anchor>
      </Center>

      <Table mt={'md'}>
        <Table.Tbody>
          <CopyableDataRow label={'LocationId'} value={data.locationId} />
          <CopyableDataRow label={'SiteId'} value={data.siteId} />
          <CopyableDataRow label={'PageId'} value={data.pageId} />
          <CopyableDataRow label={'Domain'} value={data.domain} />
        </Table.Tbody>
      </Table>

      {data.isAuthorized && (
        <>
          <Divider
            my="xs"
            size={'lg'}
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

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
