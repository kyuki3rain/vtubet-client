import React from 'react'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Paper from '@material-ui/core/Paper';

import TabPanel from '../Basic/TabPanel';
import ParticipationList from './ParticipationList';
import { Contest } from '../../pages/ContestPage';
import { bet_type, bet_type_index, BET_TYPE_JA } from '../../types/bet_type';
import ParticipationsSelect from './ParticipationsSelect';

type Props = {
  contest: Contest;
  get_contest: () => void;
}

const ContestTab: React.FC<Props> = ({contest, get_contest}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  if(!contest.chances){
    return (
      <div>
      </div>
    )
  }

  return (
    <>
      <Paper style={{flexGrow: 1}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {BET_TYPE_JA.map((ja) => {
            return <Tab label={ja} />;
          })}
        </Tabs>
      </Paper>
      <SwipeableViews
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {bet_type.map((b) => {
          if(["win", "place"].includes(b)){
            return (
              <TabPanel value={value} index={bet_type_index(b)}>
                <ParticipationList
                  chances={contest.chances[b]}
                  get_contest={get_contest}
                />
              </TabPanel>
            )
          }
          else{
            return (
              <TabPanel value={value} index={bet_type_index(b)}>
                <ParticipationsSelect
                  chances={contest.chances[b]}
                  members={contest.members}
                  get_contest={get_contest}
                />
              </TabPanel>
            )
          }
        })}
      </SwipeableViews>
    </>
  );
}

export default ContestTab;