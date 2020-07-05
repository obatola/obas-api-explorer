import React from 'react';
import Explorers from './components/explorerComponent/Explorers';
import { apiConfigs } from './APIConfig';

function App() {
  return (
    <div className="App">
      <Explorers config={apiConfigs} />
    </div>
  );
}

export default App;
