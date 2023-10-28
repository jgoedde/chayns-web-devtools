import { useTobitAccessTokenStorage } from '@src/shared/hooks/useTobitAccessTokenStorage';
import useSWR from 'swr';

const fetcher = ([url, token]) =>
  fetch(url, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then(res => res.json());

export function useRelations(query: string) {
  const [accessToken] = useTobitAccessTokenStorage();

  const { data, isLoading, error } = useSWR<{
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
  }>([`https://relations.chayns.net/relations/v2/person?skip=0&take=5&query=${query}`, accessToken], fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    relations: data?.list ?? [],
    isLoading,
    error,
  };
}
