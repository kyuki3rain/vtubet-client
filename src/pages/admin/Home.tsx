import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

import api from '../../helper/api';
import Wrapper from '../../components/Wrapper/Wrapper';
import Text from '../../components/Basic/Text';
import styled from 'styled-components';
import { Contest } from '../ContestPage';

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
`;

export default function Home() {
  const [contests, setContests] = useState([{} as Contest]);
  const history = useHistory();

  const get_contests = () => {
    axios
      .get(api('contests'), {
        params: {
          admin: true,
        },
        withCredentials: true,
      })
      .then((response) => {
        setContests(response.data);
      })
      .catch((error) => console.log('更新失敗', error));
  };

  const publish_contest = (id: number) => {
    axios
      .get(api('contests/' + id + '/publish'), {
        params: {
          admin: true,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        get_contests();
      })
      .catch((error) => console.log('更新失敗', error));
  };

  const destroy_contest = (id: number) => {
    axios
      .delete(api('contests/' + id), {
        params: {
          admin: true,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        get_contests();
      })
      .catch((error) => console.log('更新失敗', error));
  };

  useEffect(() => {
    get_contests();
  }, []);

  return (
    <Wrapper>
      <RowContainer>
        <Text variant="h4" color="black">
          作成したコンテスト一覧
        </Text>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => {
            history.push('/admin/contest/create');
          }}
          type="submit"
        >
          新規作成
        </Button>
      </RowContainer>
      <CssBaseline />
      <List>
        {contests.map((contest) => {
          return (
            <ListItem key={contest.id}>
              <ListItemText
                primary={contest.title}
                secondary={
                  contest.members
                    ?.slice(0, 3)
                    .map((t) => t.name)
                    .join('、') + 'など参加'
                }
              />
              {contest.status === 'draft' && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => {
                      history.push(`/admin/contest/${contest.id}`);
                    }}
                    type="submit"
                  >
                    編集
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => {
                      publish_contest(contest.id);
                    }}
                    type="submit"
                  >
                    公開
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => {
                      destroy_contest(contest.id);
                    }}
                    type="submit"
                  >
                    削除
                  </Button>
                </>
              )}
              {contest.status === 'published' && (
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={() => {
                    history.push(`/admin/contest/${contest.id}/finish`);
                  }}
                  type="submit"
                >
                  終了する
                </Button>
              )}
            </ListItem>
          );
        })}
      </List>
    </Wrapper>
  );
}
