import { useTobitAccessTokenStorage } from '@src/shared/hooks/useTobitAccessTokenStorage';
import { differenceInDays } from 'date-fns';

export function useIsAccessTokenAvailable() {
  const [first] = useTobitAccessTokenStorage();

  return first.accessToken != null && differenceInDays(new Date(), first.saveTime) <= 1;
}
