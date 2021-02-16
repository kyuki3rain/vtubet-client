import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import Counter from '../Basic/Counter';
import api from '../../helper/api';
import SelectBox from './SelectBox';
import Text from '../Basic/Text';
import styled from 'styled-components';
import { BetType, bet_type_length } from '../../helper/bet_type';
import { Chance } from '../../helper/chances';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 16px;
`;

type Props = {
  contest_id: number;
  member_names: Array<string>;
  bet_type: BetType;
};

const get_chance = (chances: Array<Chance>, selectMemberNames: Array<string>) => {
  console.log(selectMemberNames);
  for (const chance of chances) {
    if (chance.has_order) {
      if (selectMemberNames.toString() === chance.member_names.toString()) {
        return chance;
      }
    } else if (
      chance.member_names.every((name) => {
        return selectMemberNames.includes(name);
      })
    ) {
      return chance;
    }
  }
  return null;
};

const get_is_bet = (
  contest_id: number,
  chance: Chance,
  setIsBet: React.Dispatch<React.SetStateAction<boolean>>
) => {
  axios
    .get(api('contests/' + contest_id + '/chances/' + chance.id), { withCredentials: true })
    .then((response) => {
      console.log(response.data);
      setIsBet(response.data.is_bet);
    })
    .catch((error) => console.log('更新失敗', error));
};

const ParticipationsSelect: React.FC<Props> = ({ contest_id, member_names, bet_type }) => {
  const length = bet_type_length(bet_type);
  const [point, setPoint] = useState(0);
  const [chances, setChances] = useState([] as Array<Chance>);
  const [isBet, setIsBet] = useState(false);
  const [time, setTime] = useState('');
  const [selectMembers, setSelectMembers] = useState(
    Array.from(new Array(length)).map((v, i) => i)
  );
  const selectMemberNames = selectMembers.map((s) => {
    return member_names[s];
  });
  const chance = get_chance(chances, selectMemberNames);

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
      })
      .catch((error) => console.log('更新失敗', error));
  };

  useEffect(() => {
    if (chance) get_is_bet(contest_id, chance, setIsBet);
  }, [chance]);

  useEffect(() => {
    get_chances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const create_bet = (chance: Chance) => {
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

  if (!chances) {
    return <div>a</div>;
  }

  if (length !== 2 && length !== 3) {
    return <div>b</div>;
  }

  if (!chance) {
    return <div>c</div>;
  }

  return (
    <>
      <div>更新時間：{time}</div>
      <Wrapper>
        {new Array(length).fill('').map((_, i) => {
          const check_duplicate = (index: number): boolean => {
            let arr = selectMembers.slice();
            arr.splice(i, 1);
            return arr.includes(index);
          };

          return (
            <SelectBox
              key={i}
              value={selectMembers[i]}
              member_names={member_names}
              handleChange={(event) => {
                const newMember = event.target.value as number;
                if (!check_duplicate(newMember)) {
                  let newMembers = selectMembers.slice();
                  newMembers[i] = newMember;
                  setSelectMembers(newMembers);
                }
              }}
              check_duplicate={check_duplicate}
            />
          );
        })}
      </Wrapper>
      <Wrapper>
        <Text variant="body1">{'倍率：' + (chance.rate || '*')}</Text>
        <Counter point={point} setPoint={setPoint}></Counter>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => {
            create_bet(chance);
          }}
          disabled={isBet}
        >
          賭ける
        </Button>
      </Wrapper>
    </>
  );
};

export default ParticipationsSelect;
