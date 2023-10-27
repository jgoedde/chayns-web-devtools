import React from 'react';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { NoChaynsEnvFound } from '@pages/popup/NoChaynsEnvFound';
import { useChaynsEnvData } from '@pages/popup/useChaynsEnvData';
import { Anchor, Center, Table, Title } from '@mantine/core';
import { WaitingForData } from '@pages/popup/WaitingForData';
import { CopyableDataRow } from '@pages/popup/CopyableDataRow';

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
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
