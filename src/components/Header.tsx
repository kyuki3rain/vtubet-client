import { useHistory } from 'react-router-dom';
import React from 'react'
import styled from 'styled-components';
import media from '../helper/media';
import Menu from './Menu';
import { Link } from './Link';

const Background = styled.div`
  width: 100%;
  background: #1976d2;
  color: white;

  /* PC */
  ${media.pc`
    height: 64px;
  `}

  /* Smartphones */
  ${media.sp`
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

export default function Header() {
  const history = useHistory();

  return (
    <Background>
      <HeaderWrapper>
        <Link onClick={()=>history.push('/')}>Vtubet</Link>
        <Menu></Menu>
      </HeaderWrapper>
    </Background>
  )
}