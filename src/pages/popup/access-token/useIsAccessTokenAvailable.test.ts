import { useTobitAccessTokenStorage } from '@src/shared/hooks/useTobitAccessTokenStorage';
import { addHours, differenceInDays } from 'date-fns';
import { useIsAccessTokenAvailable } from '@pages/popup/access-token/useIsAccessTokenAvailable';

jest.mock('@src/shared/hooks/useTobitAccessTokenStorage');
jest.mock('date-fns/differenceInDays');

describe('useIsAccessTokenAvailable', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns true if the access token is not null and not expired', () => {
    (useTobitAccessTokenStorage as jest.Mock).mockReturnValue([
      {
        accessToken: '123',
        saveTime: addHours(new Date(), -1),
      },
    ]);
    (differenceInDays as jest.Mock).mockReturnValue(0.5);

    expect(useIsAccessTokenAvailable()).toBe(true);
  });

  it('returns false if the access token is null', () => {
    (useTobitAccessTokenStorage as jest.Mock).mockReturnValue([
      {
        accessToken: null,
        saveTime: addHours(new Date(), -1),
      },
    ]);
    (differenceInDays as jest.Mock).mockReturnValue(0.5);

    expect(useIsAccessTokenAvailable()).toBe(false);
  });

  it('returns false if the access token is expired', () => {
    (useTobitAccessTokenStorage as jest.Mock).mockReturnValue([
      {
        saveTime: addHours(new Date(), -1),
      },
    ]);
    (differenceInDays as jest.Mock).mockReturnValue(1.3);

    expect(useIsAccessTokenAvailable()).toBe(false);
  });
});
