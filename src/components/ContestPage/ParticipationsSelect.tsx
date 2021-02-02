import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios';

import Counter from '../Basic/Counter';
import api from '../../api';
import SelectBox from './SelectBox';
import Text from '../Basic/Text';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 16px;
`;

type Chance = {
  id: number;
  rate: number;
  member_names: Array<string>;
  is_bet: boolean;
}

type Props = {
  chances: Array<Chance>;
  members: Array<string>;
  get_contest: () => void;
}

const get_chance = (chances: Array<Chance>, selectMemberNames: Array<string>) => {
  for (const chance of chances){
    if(chance.member_names.every((name) => {
      return selectMemberNames.includes(name)
    })){
      return chance;
    }
  }
  return null;
}

const ParticipationsSelect: React.FC<Props> = ({chances, members, get_contest}) => {
  const length = chances[0].member_names.length;
  const [point, setPoint] = useState(0);
  const [selectMembers, setSelectMembers] = useState(Array.from(new Array(length)).map((v,i) => i));
  const selectMemberNames = selectMembers.map((s) => { return members[s] });
  const chance = get_chance(chances, selectMemberNames);

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

  if(length !== 2 && length !== 3){
    return <div></div>;
  }

  if(!chance){
    return <div></div>;
  }

  return (
    <>
      <Wrapper>
        {
          chances[0].member_names.map((name, i) => {
            return (
              <SelectBox
                key={i}
                value={selectMembers[i]}
                members={members}
                handleChange={(event) => {
                  const newMember = event.target.value as number;
                  if(!selectMembers.includes(newMember)){
                    let newMembers = selectMembers.slice();
                    newMembers[i] = newMember;
                    setSelectMembers(newMembers);
                  }
                }}
              />
            )
          })
        }
      </Wrapper>
      <Wrapper>
        <Text variant="body1">{"倍率：" + (chance.rate || "*")}</Text>
        <Counter point={point} setPoint={setPoint}></Counter>
        <Button 
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => {
              create_bet(chance);
            }}
            disabled={chance.is_bet}
        >
            賭ける
        </Button>
      </Wrapper>
    </>
  );
}

export default ParticipationsSelect;