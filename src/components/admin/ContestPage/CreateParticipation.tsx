import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import api from '../../../helper/api';
import Text from '../../Basic/Text';
import TextField from '@material-ui/core/TextField';

type Member = {
  id: number;
  name: string;
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

type Props = {
  id: number;
  get_contest: () => void;
  handleClose: () => void;
};

const CreateParticipation: React.FC<Props> = ({ id, get_contest, handleClose }) => {
  const [members, setMembers] = useState([] as Array<Member>);
  const [newName, setNewName] = useState('');
  const classes = useStyles();

  const get_members = () => {
    axios
      .get(api('members'), { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setMembers(response.data);
      })
      .catch((error) => console.log('更新失敗', error));
  };

  const create_member = () => {
    axios
      .post(
        api('members'),
        {
          member: { name: newName },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        get_members();
      })
      .catch((error) => console.log('更新失敗', error));
  };
  const create_participation = (member_id: number) => {
    axios
      .post(
        api('contests/' + id + '/participations'),
        {
          participation: {
            member_id: member_id,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        get_contest();
        handleClose();
      })
      .catch((error) => console.log('更新失敗', error));
  };

  useEffect(() => {
    get_members();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.paper}>
      <form noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="名前"
          value={newName}
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => {
            create_member();
          }}
        >
          作成
        </Button>
      </form>
      {members.map((member) => {
        return (
          <div
            onClick={() => {
              create_participation(member.id);
            }}
          >
            <Text variant="h4" color="black">
              {member.name}
            </Text>
          </div>
        );
      })}
    </div>
  );
};

export default CreateParticipation;
