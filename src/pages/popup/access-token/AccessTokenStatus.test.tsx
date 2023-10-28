import { useTobitAccessTokenStorage } from '@src/shared/hooks/useTobitAccessTokenStorage';
import { addDays, differenceInDays } from 'date-fns';
import { AccessTokenStatus } from '@pages/popup/access-token/AccessTokenStatus';
import '@testing-library/jest-dom';
import { render, screen } from '@root/test-utils';

jest.mock('@src/shared/hooks/useTobitAccessTokenStorage');
jest.mock('date-fns/differenceInDays');

describe('AccessTokenStatus', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the alert message if access token is null or expired', () => {
    (useTobitAccessTokenStorage as jest.Mock).mockReturnValue([
      {
        saveTime: null,
      },
    ]);
    (differenceInDays as jest.Mock).mockReturnValue(2);

    render(<AccessTokenStatus />);

    expect(screen.getByTestId('access-token-alert')).toHaveTextContent(
      'Du hast derzeit keinen AccessToken gespeichert',
    );
  });

  it('renders the alert message if access token is expired', () => {
    (useTobitAccessTokenStorage as jest.Mock).mockReturnValue([
      {
        saveTime: addDays(new Date(), -3).getTime(),
      },
    ]);
    (differenceInDays as jest.Mock).mockReturnValue(2);

    render(<AccessTokenStatus />);

    expect(screen.getByTestId('access-token-alert')).toHaveTextContent(
      'Du hast derzeit keinen AccessToken gespeichert',
    );
  });

  it('renders null if access token is not expired', () => {
    const currentDate = new Date();
    (useTobitAccessTokenStorage as jest.Mock).mockReturnValue([
      {
        saveTime: currentDate.toString(),
      },
    ]);
    (differenceInDays as jest.Mock).mockReturnValue(0);

    const { container } = render(<AccessTokenStatus />);
    expect(container).not.toHaveTextContent('AccessToken');
  });
});
