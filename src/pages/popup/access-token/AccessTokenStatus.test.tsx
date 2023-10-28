import { AccessTokenStatus } from '@pages/popup/access-token/AccessTokenStatus';
import '@testing-library/jest-dom';
import { render, screen } from '@root/test-utils';
import { useIsAccessTokenAvailable } from '@pages/popup/access-token/useIsAccessTokenAvailable';

jest.mock('@src/pages/popup/access-token/useIsAccessTokenAvailable.ts');

describe('AccessTokenStatus', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the alert message if access token is not available', () => {
    (useIsAccessTokenAvailable as jest.Mock).mockReturnValue(false);

    render(<AccessTokenStatus />);

    expect(screen.getByTestId('access-token-alert')).toHaveTextContent(
      'Du hast derzeit keinen AccessToken gespeichert',
    );
  });

  it('does not render the alert message if access token is available', () => {
    (useIsAccessTokenAvailable as jest.Mock).mockReturnValue(true);

    const { container } = render(<AccessTokenStatus />);
    expect(container).not.toHaveTextContent('AccessToken');
  });
});
