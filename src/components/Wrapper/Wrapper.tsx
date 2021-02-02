import React from 'react';

import Header from './Header';
import styled from 'styled-components';
import media from '../../helper/media';
import Footer from './Footer';

const Body = styled.div`
  background-color: white;
  
  /* PC */
  ${media.gm`
    width: 688px;
    margin: 0 auto;
  `}

  /* Smartphones */
  ${media.sm`
    margin-left: 24px;
    margin-right: 24px;
    width: auto;
  `}

  ${media.gs`
    margin-top: 24px;
    margin-bottom: 24px;
  `}

  ${media.ls`
    width: 100%;
  `}
`;

const Wrap = styled.div`
  background-color: #f6f6f4;
`;

const Wrapper: React.FC = ({children}) => {
    return (
        <Wrap>
            <Header></Header>
            <Body>{children}</Body>
            <Footer></Footer>
        </Wrap>
    )
}

export default Wrapper;