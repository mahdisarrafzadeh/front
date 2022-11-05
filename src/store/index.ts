
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { authenticationReducer } from '../slice/token';
 


export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

export type AppThunk = ThunkAction<void,any , unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;