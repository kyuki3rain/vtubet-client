import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import List from '@material-ui/core/List';

import api from '../api';
import Header from '../components/Header'
import BetListItem from '../components/BetListItem'

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

type Contest = {
    title: string;
    members: Array<Member>;
}

type Params = {
    id: string | undefined;
}

export default function ContestPage() {
    const [contest, setContest] = useState({} as Contest);
    const { id } = useParams<Params>();

    const get_contest = () => {
        axios.get(api("contests/" + id), { withCredentials: true })
        .then(response => {
            console.log(response.data);
            setContest(response.data);
        }).catch(error => console.log("更新失敗", error))
    }
    
    useEffect(()=>{
        get_contest();
    },[])
    
    return (
        <div>
            <Header></Header>
            <div>{contest.title}</div>
            <List>
              {contest.members?.map((member) =>{
                  return(
                    <BetListItem
                        member={member}
                        get_contest={get_contest}
                    ></BetListItem>
                  )
                })}
            </List>
        </div>
    )
}