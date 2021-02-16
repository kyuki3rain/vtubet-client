import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import Counter from '../Basic/Counter';
import { Chance } from '../../helper/chances';

type Props = {
  contest_id: number;
  chance: Chance;
  create_bet: (chance: Chance, point: number) => void;
  is_bet: boolean;
};

const ParticipationListItem: React.FC<Props> = ({ chance, create_bet, is_bet }) => {
  const [point, setPoint] = useState(0);

  if (!chance) {
    return <div></div>;
  }

  return (
    <ListItem key={chance.id}>
      <ListItemText primary={chance.member_names[0]} />
      <ListItemText primary={'倍率：' + (chance.rate || '*')} />
      <Counter point={point} setPoint={setPoint} disabled={is_bet}></Counter>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={() => {
          create_bet(chance, point);
        }}
        disabled={is_bet || !point}
      >
        賭ける
      </Button>
    </ListItem>
  );
};

export default ParticipationListItem;
