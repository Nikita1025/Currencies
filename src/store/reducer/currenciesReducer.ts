import { Dispatch } from 'redux';

import { CurrenciesAPI } from '../../api/api';

const initialState: InitialStateType[] = [];

export const currenciesReducer = (
  state = initialState,
  action: ActionType,
): InitialStateType[] => {
  switch (action.type) {
    case 'GET-DATA': {
      return action.data.map(el => ({ ...el }));
    }

    default:
      return state;
  }
};

export const getDataAC = (data: InitialStateType[]) =>
  ({ type: 'GET-DATA', data } as const);

export const getDataThunk = () => (dispatch: ThunkDispatch) => {
  CurrenciesAPI.getData().then(res => {
    dispatch(getDataAC(res.data));
  });
};

type ThunkDispatch = Dispatch<ActionType>;
type ActionType = ReturnType<typeof getDataAC>;
export type InitialStateType = {
  Cur_ID: number;
  Date: string;
  Cur_Abbreviation: string;
  Cur_Scale: number;
  Cur_Name: string;
  Cur_OfficialRate: number;
};
