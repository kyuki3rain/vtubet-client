import React from 'react';
import styled from 'styled-components';

type Props = {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
};

const Wrapper = styled.div`
  margin-bottom: 10px;
`;

const TextArea: React.FC<Props> = ({ type, name, placeholder, value, setValue }) => {
  return (
    <Wrapper>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </Wrapper>
  );
};

export default TextArea;
