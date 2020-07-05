import React, { ChangeEvent } from 'react';
import { BodySpec } from '../../APIConfig';
import { Label, LabelContentWrapper } from './ExplorerComponent.style';
import { Input } from '../../shared/styles/Input.style';
import { capitalizeString } from '../../shared/utils';

interface BodyParamProps extends BodySpec {
  onChange: (key: string, value: string | number) => void;
}

interface InputProps {
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  type: string;
  pattern?: string;
  required?: boolean;
  min?: number;
  max?: number;
}

function BodyParam({
  name,
  type,
  maxlength,
  minlength,
  placeholder,
  required,
  pattern,
  onChange,
  rangeMin,
  rangeMax,
}: BodyParamProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  };

  let inputProps: InputProps = {
    type,
    maxLength: maxlength,
    minLength: minlength,
    placeholder,
    required,
    pattern,
    min: rangeMin,
    max: rangeMax,
  };

  return (
    <LabelContentWrapper>
      <Label>{capitalizeString(name)}</Label>
      <Input fullWidth onChange={handleChange} {...inputProps} />
    </LabelContentWrapper>
  );
}

export default BodyParam;
