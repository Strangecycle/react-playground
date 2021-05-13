import { UserState } from './reducers/user';

export interface RootState {
  user: UserState;
}

export interface Creator<T = any> {
  type: string;
  payload?: T;
}
