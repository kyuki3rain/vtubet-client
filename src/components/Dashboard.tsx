import React, { useContext } from 'react'
import { Context } from '../context';
import GenericTemplate from '../templates/GenericTemplate';
import Registration from './Registration';

export default function Dashboard() {
    const { state } = useContext(Context);

    return (
        <GenericTemplate title="トップページ">
            <Registration></Registration>
        </GenericTemplate>
    )
}