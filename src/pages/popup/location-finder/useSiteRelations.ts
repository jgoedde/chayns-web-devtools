import { useTobitAccessTokenStorage } from '@src/shared/hooks/useTobitAccessTokenStorage';
import useSWR from 'swr';
import { useIsAccessTokenAvailable } from '@pages/popup/access-token/useIsAccessTokenAvailable';

type SiteRelation = {
  lastLogin?: number;
  locationId: number;
  name: string;
  score?: number;
  siteId: string;
};

export function useSiteRelations(query: string) {
  const [tokenStorage] = useTobitAccessTokenStorage();
  const isAccessTokenAvailable = useIsAccessTokenAvailable();

  const shouldFetch = query !== '' && query.length > 2 && isAccessTokenAvailable;

  const { data, isLoading, error } = useSWR<{ list: SiteRelation[]; count: number }>(
    shouldFetch
      ? [`https://relations.chayns.net/relations/site?query=${query}&skip=0&take=15`, tokenStorage.accessToken]
      : null,
    ([url, token]) =>
      fetch(url, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }).then(res => res.json()),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    relations: data?.list ?? [],
    isLoading,
    error,
  };
}

export type TUseSiteRelations = ReturnType<typeof useSiteRelations>;
