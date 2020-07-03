import styled, { css } from 'styled-components';
import { timesBasePx } from '../../shared/mixins';
import { colorConstant } from '../../shared/colorConstants';

export const ExplorerWrapper = styled.div`
  max-width: 500px;
  margin: auto;
  margin-top: ${timesBasePx(4)};

  > div {
    margin-bottom: ${timesBasePx(3)};
  }
`;

export const ExplorerComponentWrapper = styled.div`
  background-color: #ecf0f1;
  padding: ${timesBasePx(2)};
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

export interface IsErrorProp {
  error?: boolean;
}

export function isErrorInput({ error }: IsErrorProp) {
  if (error) {
    return css`
      background-color: ${colorConstant.colors.lightRed};
    `;
  }
  return css`
    background-color: ${colorConstant.colors.white};
  `;
}

export const ReactJsoWrapper = styled.div<IsErrorProp>`
  ${isErrorInput}
  color: ${({ error }) => (error ? colorConstant.colors.white : 'black')};
  padding: ${timesBasePx(1 / 2)} ${timesBasePx(1)};
`;
