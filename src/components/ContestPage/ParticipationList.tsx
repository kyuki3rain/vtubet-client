import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import api from '../../helper/api';
import { BetType } from '../../helper/bet_type';
import { Chance } from '../../helper/chances';
import ParticipationListItem from './ParticipationListItem';

type Props = {
  contest_id: number;
  bet_type: BetType;
};

type IsBet = {
  id: number;
  is_bet: boolean;
};

const get_is_bets = (
  contest_id: number,
  setIsBets: React.Dispatch<React.SetStateAction<IsBet[]>>,
  bet_type: BetType
) => {
  axios
    .get(api('contests/' + contest_id + '/chances/is_bets'), {
      params: {
        bet_type: bet_type,
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
      setIsBets(response.data);
    })
    .catch((error) => console.log('更新失敗', error));
};

const ParticipationList: React.FC<Props> = ({ contest_id, bet_type }) => {
  const [chances, setChances] = useState([] as Array<Chance>);
  const [time, setTime] = useState('');
  const [isBets, setIsBets] = useState([] as Array<IsBet>);

  const get_chances = () => {
    axios
      .get(api('contests/' + contest_id + '/chances'), {
        params: {
          bet_type: bet_type,
        },
        withCredentials: true,
      })
      .then((response) => {
        setTime(response.data.time);
        setChances(response.data.chances);
        get_is_bets(contest_id, setIsBets, bet_type);
      })
      .catch((error) => console.log('更新失敗', error));
  };

  const create_bet = (chance: Chance, point: number) => {
    axios
      .post(
        api('chances/' + chance.id + '/bets/'),
        {
          bet: {
            point: point,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        get_chances();
      })
      .catch((error) => console.log('更新失敗', error));
  };

  useEffect(() => {
    get_chances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!chances) {
    return <div></div>;
  }

  return (
    <List>
      <div>更新時間：{time}</div>
      {chances.map((chance) => {
        return (
          <ParticipationListItem
            key={chance.id}
            contest_id={contest_id}
            chance={chance}
            create_bet={create_bet}
            is_bet={
              !!isBets.find((item) => {
                return item.id === chance.id;
              })?.is_bet
            }
          />
        );
      })}
    </List>
  );
};

export default ParticipationList;
