import React, { ChangeEvent } from 'react';
import { BodySpec } from '../../APIConfig';
import { Label, LabelContentWrapper } from './ExplorerComponent.style';
import { Input } from '../../shared/styles/Input.style';

interface BodyParamProps extends BodySpec {
  onChange: (key: string, value: string | number) => void;
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
}: BodyParamProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  };

  return (
    <LabelContentWrapper>
      <Label>{name}</Label>
      <Input onChange={handleChange} type={type} />
    </LabelContentWrapper>
  );
}

export default BodyParam;
