import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Context } from '../context';
import { useHistory } from 'react-router-dom';
import api from '../api';

export default function Login() {
    const { state, dispatch } = useContext(Context);
    const history = useHistory();
    
    const [email, setEmail] = useState(state.user.email)
    const [password, setPassword] = useState(state.user.password)
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      axios.post(api("login"),
        {
          email: email,
          password: password
        },
        { withCredentials: true }
      ).then(response => {
        if (response.data.logged_in) {
          dispatch({type: 'logIn'})
          dispatch({type: 'setUser', user: {email, password}})
          history.push('/dashboard')
        }
      }).catch(error => {
        console.log("login error", error)
      })
      event.preventDefault()
    }

    return (
      <div>
      <p>ログイン</p>

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

           <button type="submit">ログイン</button>
       </form>
   </div>
    )
}