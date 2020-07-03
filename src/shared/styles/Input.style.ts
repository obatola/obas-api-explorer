import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { timesBasePx } from '../mixins';
import { colorConstant } from '../colorConstants';
import {
  isErrorInput,
  IsErrorProp,
} from '../../components/explorerComponent/ExplorerComponent.style';

interface FullWidthProp {
  fullWidth?: boolean;
}

export function fullWidth({
  fullWidth,
}: FullWidthProp): FlattenSimpleInterpolation | undefined {
  if (fullWidth) {
    return css`
      width: 100%;
      min-width: 100%;
    `;
  }
}

const form = css<FullWidthProp>`
  height: ${timesBasePx(3)};
  font-size: ${timesBasePx(1)};
  font-weight: 400;
  border: 1px solid ${colorConstant.form.border};
  border-radius: ${timesBasePx(1 / 3)};
  padding: ${timesBasePx(1 / 2)} ${timesBasePx(1)};
  ${fullWidth}

  &:focus {
    border: 1px solid ${colorConstant.form.focus};
    box-shadow: inset 0 0 0 1px ${colorConstant.form.focus};
    outline: none;

    &:hover {
      border-color: ${colorConstant.form.focus};
    }
  }

  &::placeholder {
    color: ${colorConstant.form.placeholder};
  }
`;

export const Select = styled.select<FullWidthProp>`
  ${form} 
  background-color: ${colorConstant.colors.white};
  background-image: none;
`;

export const Input = styled.input<FullWidthProp>`
  ${form}
  box-sizing: border-box;
  padding: ${timesBasePx(1 / 2)} ${timesBasePx(1)};
`;

export const Button = styled.button<FullWidthProp>`
  ${form}
  border: transparent;
  cursor: pointer;
  border-radius: ${timesBasePx(1 / 3)};
  background-color: ${colorConstant.button.primary};
  color: ${colorConstant.button.text};
  line-height: 1;
`;

export const TextArea = styled.textarea<IsErrorProp & FullWidthProp>`
  ${form}
  ${isErrorInput}
  height: auto;
  max-width: 100%;
  min-width: 100%;
  width: 100%;
  box-sizing: border-box;
  font-size: ${timesBasePx(1)};
  padding: ${timesBasePx(1 / 2)} ${timesBasePx(1)};
  background-color: ${colorConstant.colors.white};
`;
