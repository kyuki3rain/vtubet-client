import axios from 'axios';
import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ButtonGroup from "@material-ui/core/ButtonGroup";

import api from '../api';

type Chance = {
    id: number;
    bet_type: string;
    rate: number;
    is_bet: boolean;
}

type Member = {
    name: string;
    chances: Array<Chance>;
}

type Props = {
  member: Member;
  get_contest: () => void;
}

const BetListItem: React.FC<Props> = ({member, get_contest}) => {
    const [point, setPoint] = useState(0);

    const create_bet = () => {
        axios.post(api("chances/" + member.chances[0].id + "/bets/"), {
            bet: {
              point: point
            }
        }, { withCredentials: true })
        .then(response => {
          get_contest();
        }).catch(error => console.log("更新失敗", error))
    }
    
    return(
      <ListItem key={member.name}>
          <ListItemText primary={member.name} />
          <ListItemText primary={"倍率：" + (member.chances[0].rate || "*")} />
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button onClick={() => {if(point <
               10000){setPoint(point + 100)}}}>+</Button>
            <Button disabled>{point}</Button>
            <Button onClick={() => {if(point >= 100){setPoint(point - 100)}}}>-</Button>
          </ButtonGroup>
          <Button 
              variant="contained"
              color="primary"
              disableElevation
              onClick={create_bet}
              disabled={member.chances[0].is_bet}
          >
              賭ける
          </Button>
      </ListItem>
    )
}

export default BetListItem;