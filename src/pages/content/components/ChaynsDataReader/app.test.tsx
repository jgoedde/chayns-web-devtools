import { render } from '@root/test-utils';
import App from '@pages/content/components/ChaynsDataReader/app';
import { useChaynsSiteDataStorage } from '@src/shared/hooks/useChaynsSiteDataStorage';

jest.mock('@src/shared/hooks/useChaynsSiteDataStorage');

describe('ChaynsDataReader', () => {
  beforeEach(() => {
    (useChaynsSiteDataStorage as jest.Mock).mockReturnValue([{}, jest.fn()]);
  });

  it('should add chrome message listener on render', () => {
    render(<App />);

    expect(global.chrome.runtime.onMessage.addListener).toHaveBeenCalledTimes(1);
  });

  it('should remove chrome message listener on cleanup', () => {
    const { unmount } = render(<App />);

    unmount();

    expect(global.chrome.runtime.onMessage.removeListener).toHaveBeenCalledTimes(1);
  });
});
