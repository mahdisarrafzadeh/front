import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import authService from '../services/auth.service';
import tokenService from '../services/token.service';
import { errorMessage, successMessage } from '../components/common/message';
// Slice



export interface IAuthentication {
  isLoggedIn: boolean;
  accessToken: string | null;
}

const initialState: IAuthentication = tokenService.getUser() ?
  { accessToken: tokenService.getUser(), isLoggedIn: true } :
  { accessToken: null, isLoggedIn: false }



export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    start: (state) => {
      return {
        ...state,
        isProcessingRequest: true,
      };
    },
    success: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        isLoggedIn: true,
      };
    },
    error: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        isLoggedIn: false,
      };
    },
    logout: (state) => {
      return {
        ...state,
        accessToken: null,
        isLoggedIn: false
      }
    }
  },
});

export const authenticateUser = createAsyncThunk(
  "/login",
  async ({ username, password }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(start())
      const authData = await authService.login(username, password)
      tokenService.setUser(authData.token);
      successMessage("welcome")
      thunkAPI.dispatch(success(authData.token));
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      errorMessage(message)
      thunkAPI.dispatch(error(message));
    }
  }
);

export const logoutUser = createAsyncThunk("/logout", async ({ }: any, thunkAPI) => {
  await authService.logout();
  successMessage("logout")
  thunkAPI.dispatch(logout())
});



export const { start, success, error, logout } = authenticationSlice.actions;
export const selectAuthentication = (state: RootState) => state.authentication;
export const selectToken = (state: RootState) => state.authentication.accessToken;
export const authenticationReducer = authenticationSlice.reducer;