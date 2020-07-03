import styled from 'styled-components';
import { timesBasePx } from '../../shared/mixins';
import { colorConstant } from '../../shared/colorConstants';

export const ExplorerWrapper = styled.div`
  max-width: 500px;
  padding: ${timesBasePx(2)};
  margin: auto;
  margin-top: ${timesBasePx(4)};
  background-color: #ecf0f1;
`;

export const Title = styled.div`
  font-size: ${timesBasePx(2)};
  margin-bottom: ${timesBasePx(2)};
`;

export const SectionWrapper = styled.div`
  margin-bottom: ${timesBasePx(1.5)};
`;

export const SectionHeader = styled.div`
  font-size: ${timesBasePx(1.5)};
  margin-bottom: ${timesBasePx(1.2)};
`;

export const Label = styled.div`
  font-size: ${timesBasePx(1.2)};
  margin-bottom: ${timesBasePx(0.5)};
`;

export const LabelContentWrapper = styled.div`
  margin-bottom: ${timesBasePx(1)};
`;

export const ReactJsoWrapper = styled.div`
  background-color: ${colorConstant.colors.white};
  padding: ${timesBasePx(1 / 2)} ${timesBasePx(1)};
`;
