import axios from 'axios';
import React, { useContext } from 'react'
import { Context } from '../context';
import { User } from '../reducer';
import Login from './Login';
import Registration from './Registration'

export default function Home() {
    const { state, dispatch } = useContext(Context);

    const logout = () => {
        axios.delete("http://localhost:3001/logout", { withCredentials: true })
        .then(response => {
            if(response.data.logged_out){
                dispatch({type: 'logOut'})
                dispatch({type: 'setUser', user: {} as User})
            }
        }).catch(error => console.log("ログアウトエラー", error))
    }

    return (
        <div>
            <h1>Home</h1>
            <h2>ログイン状態: {state.loggedInStatus? 'ログイン済み' : '未ログイン'}</h2>
            <button onClick={logout}>ログアウト</button>
            <Registration  />
            <Login />
        </div>
    )
}