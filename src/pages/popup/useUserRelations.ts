import { useTobitAccessTokenStorage } from '@src/shared/hooks/useTobitAccessTokenStorage';
import useSWR from 'swr';

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
  const [accessToken] = useTobitAccessTokenStorage();

  const shouldFetch = query !== '';

  const { data, isLoading, error } = useSWR<UserRelation[]>(
    shouldFetch
      ? [`https://relations.chayns.net/relations/user/findUser?searchString=${query}&skip=0&take=5`, accessToken]
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