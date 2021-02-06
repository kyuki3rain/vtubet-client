export type User = {
  email: string;
  password: string;
  authority: string;
}

export type StateType = {
  user: User;
  loggedInStatus: boolean;
};

export type ActionType = {
  user?: User;
  type: string;
};

export const initialState = {
  user: {
    email: '',
    password: ''
  },
  loggedInStatus: false
};

export const myReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'setUser':
    return { ...state, user: {...state.user, ...action.user} };
    case 'logIn':
    return { ...state, loggedInStatus: true };
    case 'logOut':
    return { ...state, loggedInStatus: false };
    default:
      return state;
  }
};