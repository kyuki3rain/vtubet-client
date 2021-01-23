import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Context } from '../context';
import { useHistory } from 'react-router-dom';
import api from '../api';
import styled from 'styled-components';
import TextArea from './TextArea';
import Button from './Button';

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
`;

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
          history.push('/')
        }
        else{
          console.log(response.data);
          alert(response.data.errors.join("\n"));
        }
      }).catch(error => {
        console.log("login error", error)
      })
      event.preventDefault()
    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <FormWrapper>
            <TextArea
              type="email"
              name="email"
              placeholder="メールアドレス"
              value={email}
              setValue={setEmail}
            />
            <TextArea
              type="password"
              name="password"
              placeholder="パスワード"
              value={password}
              setValue={setPassword}
            />
            <Button type="submit">ログイン</Button>
          </FormWrapper>
        </form>
      </div>
    )
}