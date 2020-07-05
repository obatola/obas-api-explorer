import React, { ReactElement } from 'react';
import { APIConfigType, GlobalConfigType } from '../../APIConfig';
import ExplorerComponent from './ExplorerComponent';
import RestConsole from '../restConsole/RestConsole';
import { Divider, ExplorerWrapper } from './ExplorerComponent.style';

interface ExplorersProps {
  viewRestConsole?: boolean;
  config: APIConfigType[];
  globalConfig: GlobalConfigType;
}

function Explorers({ config, globalConfig }: ExplorersProps): ReactElement {
  const explorerDivs = config.map((explorerConfig, index) => (
    <ExplorerComponent {...explorerConfig} key={index} />
  ));

  const renderRestConsole = () => {
    if (globalConfig.viewRestConsole) {
      return <RestConsole />;
    }
  };

  return (
    <ExplorerWrapper>
      {explorerDivs}
      <Divider />
      {renderRestConsole()}
    </ExplorerWrapper>
  );
}

export default Explorers;
