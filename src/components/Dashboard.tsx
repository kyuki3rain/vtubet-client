import React, { useContext } from 'react'
import { Context } from '../context';

export default function Dashboard() {
    const { state, dispatch } = useContext(Context);

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>ログイン状態: {state.loggedInStatus? 'ログイン済み' : '未ログイン'}</h2>
        </div>
    )
}