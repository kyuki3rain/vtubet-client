import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import Counter from '../Basic/Counter';
import { Chance } from '../../helper/chances';

type Props = {
  chance: Chance;
  create_bet: (chance: Chance, point: number) => void;
}

const ParticipationListItem: React.FC<Props> = ({chance, create_bet}) => {
  const [point, setPoint] = useState(0);

  return (
    <ListItem key={chance.id}>
        <ListItemText primary={chance.member_names[0]} />
        <ListItemText primary={"倍率：" + (chance.rate || "*")} />
        <Counter point={point} setPoint={setPoint} disabled={chance.is_bet}></Counter>
        <Button 
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => { create_bet(chance, point) }}
            disabled={chance.is_bet || !point}
        >
            賭ける
        </Button>
    </ListItem>

  );
}

export default ParticipationListItem;