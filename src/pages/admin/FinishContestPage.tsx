import React from 'react';

import Wrapper from '../../components/Wrapper/Wrapper';
import MemberList from '../../components/admin/ContestPage/MemberList';
import { useParams } from 'react-router-dom';

type Params = {
  id: string | undefined;
};

export default function CreateContestPage() {
  const { id } = useParams<Params>();
  return (
    <Wrapper>
      <MemberList id={Number(id)}></MemberList>
    </Wrapper>
  );
}
