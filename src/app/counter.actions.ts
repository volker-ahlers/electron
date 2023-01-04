import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment', );
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');


export const login = createAction(
    '[Login Page] Login',
    props<{payload: {username: string; password: string;}}>(),
)


export const logout = createAction('[Login Page] Logout'); 