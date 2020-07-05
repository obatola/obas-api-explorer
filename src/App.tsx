import React from 'react';
import { apiConfig, globalConfig } from './APIConfig';
import {
  Divider,
  ExplorerWrapper,
} from './components/explorerComponent/ExplorerComponent.style';
import ExplorerComponent from './components/explorerComponent/ExplorerComponent';
import RestConsole from './components/restConsole/RestConsole';

function App() {
  const renderRestConsole = () => {
    if (globalConfig.viewRestConsole) {
      return <RestConsole />;
    }
  };

  return (
    <div className="App">
      <ExplorerWrapper>
        <ExplorerWrapper>
          <ExplorerComponent
            title={apiConfig.title}
            url={apiConfig.url}
            body={apiConfig.body}
            method={apiConfig.method}
          />
          <Divider />
          {renderRestConsole()}
        </ExplorerWrapper>
      </ExplorerWrapper>
    </div>
  );
}

export default App;
