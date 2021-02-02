import axios from 'axios'
import React, { useReducer, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { myReducer, initialState } from './reducer'
import { Context } from './context'
import api from './api'

import GlobalStyle from './helper/baseStyle'
import ContestPage from './pages/ContestPage'
import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import UserPage from './pages/UserPage'
import LoginPage from './pages/LoginPage'

export default function App() {
  const [state, dispatch] = useReducer(myReducer, initialState);
  
  const checkLoginStatus = () => {
    axios.get(api("logged_in"), { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && !state.loggedInStatus) {
          dispatch({type: 'logIn'})
          dispatch({type: 'setUser', user: response.data.user})
        } else if (!response.data.logged_in && state.loggedInStatus) {
          dispatch({type: 'logOut'})
          dispatch({type: 'setUser', user: {}})
        }
      console.log("ログイン状況", response)
    }).catch(error => {
      console.log("ログインエラー", error)
    })
  }

  useEffect(() => {
    checkLoginStatus()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // 追加

  return (
    <div>
      <GlobalStyle/>
      <Context.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/register"} component={RegisterPage} />
            <Route exact path={"/login"} component={LoginPage} />
            <Route exact path={"/contest/:id"} component={ContestPage} />
            <Route exact path={"/mypage"} component={UserPage} />
          </Switch>
        </BrowserRouter>
      </Context.Provider>
    </div>
  )
}