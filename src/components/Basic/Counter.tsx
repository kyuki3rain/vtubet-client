import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import styled from 'styled-components';

type Props = {
  point: number;
  setPoint: React.Dispatch<React.SetStateAction<number>>;
  disabled?: boolean;
};

const Wrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
`;

const Point = styled(Button)`
  pointer-events: none;
`;

const Counter: React.FC<Props> = ({ point, setPoint, disabled = false }) => {
  return (
    <Wrapper>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button
          onClick={() => {
            if (point < 10000) {
              setPoint(point + 100);
            }
          }}
          disabled={disabled}
        >
          +
        </Button>
        <Point disabled={disabled}>{point}</Point>
        <Button
          onClick={() => {
            if (point >= 100) {
              setPoint(point - 100);
            }
          }}
          disabled={disabled}
        >
          -
        </Button>
      </ButtonGroup>
    </Wrapper>
  );
};

export default Counter;
