import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { timesBasePx } from '../mixins';
import { colorConstant } from '../colorConstants';
import {
  isErrorInput,
  IsErrorProp,
} from '../../components/explorerComponent/ExplorerComponent.style';
import { styleConstants } from '../styleConstants';

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
  border-radius: ${styleConstants.borderRadius};
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

  &:disabled {
    cursor: not-allowed;
  }
`;

const input = css`
  &:focus {
    background-color: ${colorConstant.form.input.activeBackground};
  }
`;

export const Select = styled.select<FullWidthProp>`
  ${form} 
  ${input}

  background-color: ${colorConstant.colors.white};
  background-image: none;
`;

export const Input = styled.input<FullWidthProp>`
  ${form}
  ${input}
  box-sizing: border-box;
  padding: ${timesBasePx(1 / 2)} ${timesBasePx(1)};
`;

interface ButtonTypeProp {
  ghost?: boolean;
  primary?: boolean;
}

function buttonType(props: ButtonTypeProp) {
  if (props.ghost) {
    return css`
      background-color: ${colorConstant.button.ghost.primary};
      border: 1px solid transparent;
      color: ${colorConstant.button.ghost.text};
      background-color: transparent;

      &:hover {
        background-color: ${colorConstant.button.ghost.hover};
      }

      &:active {
        background-color: ${colorConstant.button.ghost.down};
      }
    `;
  }

  return css`
    background-color: ${colorConstant.button.primary};
    color: ${colorConstant.button.text};
    border: transparent;

    &:hover {
      background-color: ${colorConstant.button.hover};
    }

    &:active {
      background-color: ${colorConstant.button.down};
    }
  `;
}

interface ButtonSizeProp {
  compact?: boolean;
}

function buttonSize(props: ButtonSizeProp) {
  if (props.compact) {
    return css`
      line-height: 0;
      height: 30px;
    `;
  }
}

type ButtonProps = FullWidthProp & ButtonTypeProp & ButtonSizeProp;

export const Button = styled.button<ButtonProps>`
  ${form}
  ${buttonType}
  ${buttonSize}
  cursor: pointer;
  border-radius: ${styleConstants.borderRadius};
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out, border 0.2s ease-in-out;
  line-height: 1;
`;

export const TextArea = styled.textarea<IsErrorProp & FullWidthProp>`
  ${form}
  ${input}
  ${isErrorInput}
  height: auto;
  max-width: 100%;
  min-width: 100%;
  width: 100%;
  box-sizing: border-box;
  font-size: ${timesBasePx(1)};
  padding: ${timesBasePx(1 / 2)} ${timesBasePx(1)};
  background-color: ${colorConstant.colors.white};

  &:disabled {
    background-color: ${colorConstant.colors.nuetral1};
  }
`;
