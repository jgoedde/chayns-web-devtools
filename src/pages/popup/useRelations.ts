import { useTobitAccessTokenStorage } from '@src/shared/hooks/useTobitAccessTokenStorage';
import useSWR from 'swr';

const fetcher = ([url, token]) =>
  fetch(url, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then(res => res.json());

type Relation = {
  personId: string;
  userId: number;
  firstName: string;
  lastName: string;
};

export function useRelations(query: string) {
  const [accessToken] = useTobitAccessTokenStorage();

  const shouldFetch = query !== '';

  const { data, isLoading, error } = useSWR<Relation[]>(
    shouldFetch ? [`https://relations.chayns.net/relations/user/findUser?searchString=${query}`, accessToken] : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    relations: data ?? [],
    isLoading,
    error,
  };
}

export type TUseRelations = ReturnType<typeof useRelations>;
