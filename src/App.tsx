import React from 'react';
import './App.css';
// import RestConsole from './components/restConsole/RestConsole';
import Explorers from './components/explorerComponent/Explorers';
import { apiConfigs } from './APIConfig';

function App() {
  return (
    <div className="App">
      {/*<RestConsole />*/}
      <Explorers config={apiConfigs} />
    </div>
  );
}

export default App;
