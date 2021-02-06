import axios from 'axios';
import React, { useContext } from 'react';
import api from '../helper/api';
import { Context } from '../context';
import { User } from '../reducer';
import Login from '../components/Login';
import Registration from '../components/Registration';

export default function Home() {
  const { state, dispatch } = useContext(Context);

  const logout = () => {
    axios
      .delete(api('logout'), { withCredentials: true })
      .then((response) => {
        if (response.data.logged_out) {
          dispatch({ type: 'logOut' });
          dispatch({ type: 'setUser', user: {} as User });
        } else {
          console.log(response.data);
          alert(response.data.errors.join('\n'));
        }
      })
      .catch((error) => console.log('ログアウトエラー', error));
  };

  return (
    <div>
      <h1>Home</h1>
      <h2>ログイン状態: {state.loggedInStatus ? 'ログイン済み' : '未ログイン'}</h2>
      <button onClick={logout}>ログアウト</button>
      <Registration />
      <Login />
    </div>
  );
}
