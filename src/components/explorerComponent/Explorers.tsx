import React, { ReactElement } from 'react';
import { APIConfigType } from '../../APIConfig';
import ExplorerComponent from './ExplorerComponent';
import { ExplorerWrapper } from './ExplorerComponent.style';

interface ExplorersProps {
  config: APIConfigType[];
}

function Explorers({ config }: ExplorersProps): ReactElement {
  const explorerDivs = config.map((explorerConfig, index) => (
    <ExplorerComponent {...explorerConfig} key={index} />
  ));

  return <ExplorerWrapper>{explorerDivs}</ExplorerWrapper>;
}

export default Explorers;
