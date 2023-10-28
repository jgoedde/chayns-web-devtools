import { useTobitAccessTokenStorage } from '@src/shared/hooks/useTobitAccessTokenStorage';
import useSWR from 'swr';
import { useIsAccessTokenAvailable } from '@pages/popup/access-token/useIsAccessTokenAvailable';

const fetcher = ([url, token]) =>
  fetch(url, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then(res => res.json());

type UserRelation = {
  personId: string;
  userId: number;
  firstName: string;
  lastName: string;
};

export function useUserRelations(query: string) {
  const [tokenStorage] = useTobitAccessTokenStorage();
  const isAccessTokenAvailable = useIsAccessTokenAvailable();

  const shouldFetch = query !== '' && isAccessTokenAvailable;

  const { data, isLoading, error } = useSWR<UserRelation[]>(
    shouldFetch
      ? [`https://relations.chayns.net/relations/user/findUser?searchString=${query}`, tokenStorage.accessToken]
      : null,
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
