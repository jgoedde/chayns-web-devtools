import React from 'react';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import useStorage from '@src/shared/hooks/useStorage';
import { chaynsStorage } from '@src/shared/storages/chaynsStorage';

const Popup = () => {
  const chayns = useStorage(chaynsStorage);

  return (
    <div className="App">
      <header className="App-header">
        <p className="text-lime-400">
          Edit <code>src/pages/popup/Popup.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React!
        </a>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
