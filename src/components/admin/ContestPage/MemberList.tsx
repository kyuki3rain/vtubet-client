import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import api from '../../../helper/api';
import Text from '../../Basic/Text';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

type Member = {
  id: number;
  name: string;
};

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

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
};

const MemberList: React.FC<Props> = ({ id }) => {
  const [members, setMembers] = useState([] as Array<Member>);
  const [rank, setRank] = useState([] as Array<number>);
  const history = useHistory();
  const classes = useStyles();

  const get_members = () => {
    axios
      .get(api('contests/' + id + '/participations'), { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setMembers(response.data);
      })
      .catch((error) => console.log('更新失敗', error));
  };

  const finish_contest = () => {
    axios
      .get(api('contests/' + id + '/finish'), {
        params: {
          rank: rank,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        history.push(`/admin`);
      })
      .catch((error) => console.log('更新失敗', error));
  };

  useEffect(() => {
    get_members();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.paper}>
      {members.map((member) => {
        return (
          <RowContainer>
            <Text variant="h4" color="black">
              {member.name}
            </Text>
            <TextField
              id="standard-number"
              label="順位"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={rank[member.id]}
              onChange={(event) => {
                let new_rank = rank.slice();
                new_rank[member.id] = Number(event.target.value);
                setRank(new_rank);
              }}
            />
          </RowContainer>
        );
      })}
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={() => {
          finish_contest();
        }}
      >
        確定
      </Button>
    </div>
  );
};

export default MemberList;
