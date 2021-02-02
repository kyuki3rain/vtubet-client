import React from 'react'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Paper from '@material-ui/core/Paper';

import TabPanel from '../Basic/TabPanel';
import ParticipationList from './ParticipationList';
import { Contest } from '../../pages/ContestPage';
import { bet_type_index } from '../../types/bet_type';
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
          <Tab label="単勝" />
          <Tab label="複勝" />
          <Tab label="馬単" />
          <Tab label="馬連" />
          <Tab label="ワイド" />
          <Tab label="三連単" />
          <Tab label="三連複" />
        </Tabs>
      </Paper>
      <SwipeableViews
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={bet_type_index("win")}>
          <ParticipationList
            chances={contest.chances["win"]}
            get_contest={get_contest}
          ></ParticipationList>
        </TabPanel>
        <TabPanel value={value} index={bet_type_index("place")}>
          <ParticipationList
            chances={contest.chances["place"]}
            get_contest={get_contest}
          ></ParticipationList>
        </TabPanel>
        <TabPanel value={value} index={bet_type_index("exacta")}>
          <ParticipationsSelect
            chances={contest.chances["exacta"]}
            members={contest.members}
            get_contest={get_contest}
          />
        </TabPanel>
        <TabPanel value={value} index={bet_type_index("quinella")}>
          <ParticipationsSelect
            chances={contest.chances["quinella"]}
            members={contest.members}
            get_contest={get_contest}
          />
        </TabPanel>
        <TabPanel value={value} index={bet_type_index("quinella_place")}>
          <ParticipationsSelect
            chances={contest.chances["quinella_place"]}
            members={contest.members}
            get_contest={get_contest}
          />
        </TabPanel>
        <TabPanel value={value} index={bet_type_index("tierce")}>
          <ParticipationsSelect
            chances={contest.chances["tierce"]}
            members={contest.members}
            get_contest={get_contest}
          />
        </TabPanel>
        <TabPanel value={value} index={bet_type_index("trio")}>
          <ParticipationsSelect
            chances={contest.chances["trio"]}
            members={contest.members}
            get_contest={get_contest}
          />
        </TabPanel>
      </SwipeableViews>
    </>
  );
}

export default ContestTab;