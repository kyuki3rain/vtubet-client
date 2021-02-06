import { useHistory } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import media from '../../helper/media';
import Text from '../Basic/Text';

const Background = styled.div`
  width: 100%;
  background: #3e3e3e;
  display: flex;
  align-items: center;
  justify-content: center;

  /* PC */
  ${media.gm`
    height: 64px;
  `}

  /* Smartphones */
  ${media.lm`
    height: 56px;
  `}
`;

const Footer = () => {
  const history = useHistory();

  return (
    <Background>
      <Text variant="body2" color="white">
        {'Copyright © '}
        <span onClick={() => history.push('/')}>Vtubet</span> {new Date().getFullYear()}
        {'.'}
      </Text>
    </Background>
  );
};

export default Footer;
