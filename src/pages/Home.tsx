import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Header from '../components/Header';

type Member = {
    name: string;
}

type Contest = {
    id: number;
    title: string;
    members: Array<Member>;
}

export default function Home() {
    const [contests, setContests] = useState([{} as Contest]);
    const history = useHistory();

    const get_contests = () => {
        axios.get(api("contests"), { withCredentials: true })
        .then(response => {
            setContests(response.data);
        }).catch(error => console.log("更新失敗", error))
    }

    useEffect(()=>{
        get_contests();
    },[])

    return (
        <div>
            <Header></Header>
            <List>
              {contests.map((contest) =>{
                  return(
                    <ListItem key={contest.id}>
                        <ListItemText
                            primary={contest.title}
                            secondary={contest.members?.slice(0, 3).map(t=>t.name).join("、")+"など"}
                            onClick={()=>{
                                history.push(`/contest/${contest.id}`);
                            }}
                        />
                    </ListItem>
                  )
                })}
            </List>
        </div>
    )
}