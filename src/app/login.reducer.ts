import { createReducer, on } from '@ngrx/store';
import { login, logout } from './counter.actions';

export const initialState = 0;

//Creates a reducer function to handle state transitions.

//Reducer creators reduce the explicitness of reducer functions with switch statements.
export const loginReducer = createReducer(
  initialState,
  on(login, (state) => state + 1),
  on(logout, (state) => state - 1)
);
