import React, { useEffect, useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import Counter from '../Basic/Counter';
import api from '../../helper/api';
import { BetType } from '../../helper/bet_type';
import { Chance } from '../../helper/chances';

type Props = {
  contest_id: number;
  bet_type: BetType;
}

const ParticipationList: React.FC<Props> = ({contest_id, bet_type}) => {
  const [chances, setChances] = useState([] as Array<Chance>)
  const [point, setPoint] = useState(0);

  const get_chances = () => {
    axios.get(api("contests/" + contest_id + "/chances"), {
      params: {
        bet_type: bet_type
      },
      withCredentials: true 
    })
    .then(response => {
        console.log(response.data);
        setChances(response.data);
    }).catch(error => console.log("更新失敗", error))
  }

  const create_bet = (chance: Chance) => {
    axios.post(api("chances/" + chance.id + "/bets/"), {
        bet: {
          point: point
        }
    }, { withCredentials: true })
    .then(response => {
      get_chances();
    }).catch(error => console.log("更新失敗", error));
  }

  useEffect(()=>{
    get_chances();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if(!chances){
    return (
      <div>
      </div>
    )
  }

  return (
    <List>
    {
      chances.map((chance) => {
        return(
          <ListItem key={chance.id}>
          <ListItemText primary={chance.id} />
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