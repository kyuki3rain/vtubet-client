import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../helper/api';

const CreateForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [refund, setRefund] = useState(100);
  const history = useHistory();

  const create_contest = () => {
    axios
      .post(
        api('contests'),
        {
          contest: {
            refund: refund / 100,
            title: title,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        history.push('/admin/contest/' + response.data.id);
      })
      .catch((error) => console.log('更新失敗', error));
  };

  return (
    <form noValidate autoComplete="off">
      <TextField
        id="standard-number"
        label="払戻率(%)"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={refund}
        onChange={(event) => {
          setRefund(Number(event.target.value));
        }}
      />
      <TextField
        id="standard-basic"
        label="タイトル"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={() => {
          create_contest();
        }}
      >
        作成
      </Button>
    </form>
  );
};

export default CreateForm;
