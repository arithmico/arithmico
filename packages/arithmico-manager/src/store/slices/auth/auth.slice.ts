import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loggedIn: boolean;
  accessToken: string | null;
}

const ACCESS_TOKEN_STORAGE_KEY = "accessToken";

const loadInitialState = (): AuthState => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  const loggedIn = !!accessToken;
  return {
    loggedIn,
    accessToken: loggedIn ? accessToken : null,
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
        stayLoggedIn: boolean;
      }>
    ): AuthState => {
      if (action.payload.stayLoggedIn) {
        localStorage.setItem(
          ACCESS_TOKEN_STORAGE_KEY,
          action.payload.accessToken
        );
      }

      return {
        loggedIn: true,
        accessToken: action.payload.accessToken,
      };
    },
    logout: (_state): AuthState => {
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      return {
        loggedIn: false,
        accessToken: null,
      };
    },
  },
});

export const authReducer = authSlice.reducer;
export const { login, logout } = authSlice.actions;
