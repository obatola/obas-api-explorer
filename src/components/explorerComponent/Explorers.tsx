import React, { ReactElement } from 'react';
import { APIConfigType } from '../../APIConfig';
import ExplorerComponent from './ExplorerComponent';
import RestConsole from '../restConsole/RestConsole';
import { Divider, ExplorerWrapper } from './ExplorerComponent.style';

interface ExplorersProps {
  config: APIConfigType[];
}

function Explorers({ config }: ExplorersProps): ReactElement {
  const explorerDivs = config.map((explorerConfig, index) => (
    <ExplorerComponent {...explorerConfig} key={index} />
  ));

  return (
    <ExplorerWrapper>
      {explorerDivs}
      <Divider />
      <RestConsole />
    </ExplorerWrapper>
  );
}

export default Explorers;
