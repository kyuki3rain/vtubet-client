import { useHistory } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import media from '../../helper/media';
import Menu from './Menu';
import { Link } from '../Basic/Link';

const Background = styled.div`
  width: 100%;
  background: #1976d2;
  color: white;

  /* PC */
  ${media.gm`
    height: 64px;
  `}

  /* Smartphones */
  ${media.lm`
    height: 56px;
  `}
`;

const HeaderWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const MenuWrapper = styled.div`
  flex-direction: row;
  display: flex;
  div {
    margin-left: 20px;
  }
`;

export default function Header() {
  const history = useHistory();

  return (
    <Background>
      <HeaderWrapper>
        <Link onClick={() => history.push('/')}>Vtubet</Link>
        <MenuWrapper>
          <Menu></Menu>
        </MenuWrapper>
      </HeaderWrapper>
    </Background>
  );
}
