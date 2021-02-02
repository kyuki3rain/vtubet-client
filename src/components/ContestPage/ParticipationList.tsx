import React, { useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import Counter from '../Basic/Counter';
import api from '../../api';


type Chance = {
  id: number;
  rate: number;
  member_names: Array<string>;
  is_bet: boolean;
}

type Props = {
  chances: Array<Chance>;
  get_contest: () => void;
}

const ParticipationList: React.FC<Props> = ({chances, get_contest}) => {
  const [point, setPoint] = useState(0);

  const create_bet = (chance: Chance) => {
      axios.post(api("chances/" + chance.id + "/bets/"), {
          bet: {
            point: point
          }
      }, { withCredentials: true })
      .then(response => {
        get_contest();
      }).catch(error => console.log("更新失敗", error));
  }

  return (
    <List>
    {
      chances.map((chance) => {
        const name = chance.member_names[0]
        return(
          <ListItem key={name}>
          <ListItemText primary={name} />
          <ListItemText primary={"倍率：" + (chance.rate || "*")} />
          <Counter point={point} setPoint={setPoint}></Counter>
          <Button 
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => { create_bet(chance) }}
              disabled={chance.is_bet}
          >
              賭ける
          </Button>
      </ListItem>
        );
      })
    }
    </List>
  );
}

export default ParticipationList;