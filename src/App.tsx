import React from 'react';
import Explorers from './components/explorerComponent/Explorers';
import { apiConfigs, globalConfig } from './APIConfig';

function App() {
  return (
    <div className="App">
      <Explorers globalConfig={globalConfig} config={apiConfigs} />
    </div>
  );
}

export default App;
