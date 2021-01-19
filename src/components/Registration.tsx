import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Context } from '../context';
import { useHistory } from 'react-router-dom';
import api from '../api';

export default function Registration() {
    const { state, dispatch } = useContext(Context);
    const history = useHistory();
    
    const [email, setEmail] = useState(state.user.email)
    const [password, setPassword] = useState(state.user.password)
    const [passwordConfirmation, setPasswordConfirmation] = useState(state.user.password)
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      axios.post(api("signup"),
        {
          user: {
            email: email,
            password: password,
            password_confirmation: passwordConfirmation
          }
        },
        { withCredentials: true }
      ).then(response => {
        if (response.data.created) {
          dispatch({type: 'logIn'})
          dispatch({type: 'setUser', user: {email, password}})
          history.push('/dashboard')
        }
      }).catch(error => {
        console.log("registration error", error)
      })
      event.preventDefault()
    }

    return (
      <div>
      <p>新規登録</p>

       <form onSubmit={handleSubmit}>
        <input
            type="email"
            name="email"
            placeholder="メールアドレス"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="パスワード"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="確認用パスワード"
            value={passwordConfirmation}
            onChange={event => setPasswordConfirmation(event.target.value)}
          />

           <button type="submit">登録</button>
       </form>
   </div>
    )
}