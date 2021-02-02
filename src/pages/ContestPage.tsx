import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import Wrapper from '../components/Wrapper/Wrapper';
import Text from '../components/Basic/Text';
import ContestTab from '../components/ContestPage/ContestTab';
import { BetType } from '../types/bet_type';
import axios from 'axios';
import api from '../api';

export type Chance = {
    id: number;
    rate: number;
    member_names: Array<string>;
    is_bet: boolean;
  }
  
export type Contest = {
    title: string;
    members: Array<string>;
    chances: { [key in BetType]: Array<Chance>; }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Wrapper>
            <Text variant="h4" color="black">
                {contest.title}
            </Text>
            <ContestTab
                contest={contest}
                get_contest={get_contest}
            ></ContestTab>
        </Wrapper>
    )
}