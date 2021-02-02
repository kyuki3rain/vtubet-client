import axios from 'axios';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../api';
import { Context } from '../../context';
import { User } from '../../reducer';
import { Link } from '../Basic/Link';

const MenuWrapper = styled.div`
  flex-direction: row;
  display: flex;
  div {
    margin-left: 20px;
  }
`;

export default function Menu() {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();

  const logout = () => {
    axios.delete(api("logout"), { withCredentials: true })
    .then(response => {
        if(response.data.logged_out){
            dispatch({type: 'logOut'})
            dispatch({type: 'setUser', user: {} as User})
            history.push('/login')
        }
        else{
            console.log(response.data);
            alert(response.data.errors.join("\n"));
        }
    }).catch(error => console.log("ログアウトエラー", error))
}

    return (
      <MenuWrapper>
        {
          state.loggedInStatus ? 
          <>
            <Link onClick={()=>{history.push('/mypage')}}>マイページ</Link>
            <div>|</div>
            <Link onClick={logout}>ログアウト</Link>
          </>
          :
            <>
              <Link onClick={()=>{history.push('/register')}}>登録する</Link>
              <div>|</div>
              <Link onClick={()=>{history.push('/login')}}>ログイン</Link>
            </>
        }
      </MenuWrapper>
    )
}