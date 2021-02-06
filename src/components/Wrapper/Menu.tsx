import axios from 'axios';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../helper/api';
import { Context } from '../../context';
import { User } from '../../reducer';
import { Link } from '../Basic/Link';

const Menu: React.FC = () => {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();

  const logout = () => {
    axios
      .delete(api('logout'), { withCredentials: true })
      .then((response) => {
        if (response.data.logged_out) {
          dispatch({ type: 'logOut' });
          dispatch({ type: 'setUser', user: {} as User });
          history.push('/login');
        } else {
          console.log(response.data);
          alert(response.data.errors.join('\n'));
        }
      })
      .catch((error) => console.log('ログアウトエラー', error));
  };

  if (!state.loggedInStatus) {
    return (
      <>
        <Link
          onClick={() => {
            history.push('/register');
          }}
        >
          登録する
        </Link>
        <div>|</div>
        <Link
          onClick={() => {
            history.push('/login');
          }}
        >
          ログイン
        </Link>
      </>
    );
  }

  console.log(state.user?.authority);

  if (state.user?.authority === 'admin') {
    return (
      <>
        <Link
          onClick={() => {
            history.push('/admin');
          }}
        >
          運営ページ
        </Link>
        <div>|</div>
        <Link
          onClick={() => {
            history.push('/mypage');
          }}
        >
          マイページ
        </Link>
        <div>|</div>
        <Link onClick={logout}>ログアウト</Link>
      </>
    );
  }

  return (
    <>
      <Link
        onClick={() => {
          history.push('/mypage');
        }}
      >
        マイページ
      </Link>
      <div>|</div>
      <Link onClick={logout}>ログアウト</Link>
    </>
  );
};

export default Menu;
