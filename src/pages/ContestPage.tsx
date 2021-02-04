import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import Wrapper from '../components/Wrapper/Wrapper';
import Text from '../components/Basic/Text';
import ContestTab from '../components/ContestPage/ContestTab';
import { BetType } from '../helper/bet_type';
import axios from 'axios';
import api from '../helper/api';

export type Contest = {
    title: string;
    member_names: Array<string>;
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
            <ContestTab contest_id={Number(id)} member_names={contest.member_names} />
        </Wrapper>
    )
}