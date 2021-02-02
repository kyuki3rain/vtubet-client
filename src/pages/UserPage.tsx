import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import Header from '../components/Wrapper/Header';
import api from '../api';

type Bet = {
    id: number;
    point: number;
    status: string;
    chance: {
        rate: number;
        bet_type: string;
        member_names: Array<string>;
        contest: {
            id: number;
            title: string;
        }
    }
}

export default function Home() {
    const [ bets, setBets ] = useState([] as Array<Bet>);
    const history = useHistory();

    const get_bets = () => {
        axios.get(api("bets"), { withCredentials: true })
        .then(response => {
            setBets(response.data);
        }).catch(error => console.log("更新失敗", error))
    }
    const publish_bet = (id: number) => {
        axios.get(api("bets/" + id + "/publish"), { withCredentials: true })
        .then(response => {
            get_bets();
        }).catch(error => console.log("失敗", error))
    }
    const destroy_bet = (id: number) => {
        axios.delete(api("bets/" + id), { withCredentials: true })
        .then(response => {
            get_bets();
        }).catch(error => console.log("失敗", error))
    }

    useEffect(() => {
        get_bets();
    }, [])

    return (
        <div>
            <Header></Header>
            <List>
              {bets.map((bet) => {
                  return(
                    <ListItem key={bet.id}>
                        <ListItemText
                            primary={bet.chance.contest.title}
                            onClick={()=>{
                                history.push(`/contest/${bet.chance.contest.id}`);
                            }}
                        />
                        <ListItemText
                            primary={bet.chance.member_names.join(",")}
                            onClick={()=>{
                                history.push(`/contest/${bet.chance.contest.id}`);
                            }}
                        />
                        <ListItemText
                            primary={bet.chance.bet_type}
                        />
                        <ListItemText
                            primary={bet.point}
                        />
                        {
                        bet.status === "draft" &&
                        <Button 
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={() => {publish_bet(bet.id)}}
                        >
                            確定
                        </Button>
                        }
                        <Button 
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={() => {destroy_bet(bet.id)}}
                        >
                            削除
                        </Button>
                    </ListItem>
                  )
                })}
            </List>
        </div>
    )
}