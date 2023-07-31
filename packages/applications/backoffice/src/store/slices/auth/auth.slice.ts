import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loggedIn: boolean;
  accessToken?: string;
  refreshToken?: string;
}

const ACCESS_TOKEN_STORAGE_KEY = "accessToken";
const REFRESH_TOKEN_STORAGE_KEY = "refreshToken";

const loadInitialState = (): AuthState => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
  const loggedIn = !!accessToken;
  return {
    loggedIn,
    accessToken: loggedIn ? accessToken : undefined,
    refreshToken: refreshToken ? refreshToken : undefined,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadInitialState,
  reducers: {
    login: (
      _state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>
    ): AuthState => {
      localStorage.setItem(
        ACCESS_TOKEN_STORAGE_KEY,
        action.payload.accessToken
      );
      localStorage.setItem(
        REFRESH_TOKEN_STORAGE_KEY,
        action.payload.refreshToken
      );

      return {
        loggedIn: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    },
    logout: (_state): AuthState => {
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
      return {
        loggedIn: false,
        accessToken: undefined,
        refreshToken: undefined,
      };
    },
  },
});

export const authReducer = authSlice.reducer;
export const { login, logout } = authSlice.actions;
