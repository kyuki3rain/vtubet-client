import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Context } from '../context';
import ContestPage from '../pages/admin/ContestPage';

type Props = {
  path: string;
  component: React.FC;
};

const AdminRoute: React.FC<Props> = ({ path, component }) => {
  const { state, dispatch } = useContext(Context);

  if (state.user.authority === 'admin') {
    return <Route exact path={path} component={component} />;
  }

  return <Redirect to="/" />;
};

export default AdminRoute;
