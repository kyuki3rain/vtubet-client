import React, { useState } from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Paper from '@material-ui/core/Paper';

import TabPanel from '../Basic/TabPanel';
import ParticipationList from './ParticipationList';
import { bet_type, bet_type_index, BET_TYPE_JA } from '../../helper/bet_type';
import ParticipationsSelect from './ParticipationsSelect';

type Props = {
  contest_id: number;
  member_names: Array<string>;
};

const ContestTab: React.FC<Props> = ({ contest_id, member_names }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <>
      <Paper style={{ flexGrow: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {BET_TYPE_JA.map((ja) => {
            return <Tab key={ja} label={ja} />;
          })}
        </Tabs>
      </Paper>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        {bet_type.map((b) => {
          if (['win', 'place'].includes(b)) {
            return (
              <TabPanel key={bet_type_index(b)} value={value} index={bet_type_index(b)}>
                <ParticipationList contest_id={contest_id} bet_type={b} />
              </TabPanel>
            );
          } else {
            return (
              <TabPanel key={bet_type_index(b)} value={value} index={bet_type_index(b)}>
                <ParticipationsSelect
                  contest_id={contest_id}
                  member_names={member_names}
                  bet_type={b}
                />
              </TabPanel>
            );
          }
        })}
      </SwipeableViews>
    </>
  );
};

export default ContestTab;
