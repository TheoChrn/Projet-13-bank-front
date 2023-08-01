import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface User {
  name: string;
  userToken: string | null;
  userNames: {
    userFirstName: string | null;
    userLastName: string | null;
  };
  isAuthenticated: boolean;
  errorMessage: string | null;
  isLoading: boolean | null;
  isEditing: boolean | null; 
}

const initialState: User = {
  name: "",
  userToken: null,
  userNames: {
    userFirstName: null,
    userLastName: null,
  },
  isAuthenticated: false,
  errorMessage: null,
  isLoading: null,
  isEditing: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: {} as User,
  reducers: {
    setUserToken: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload;
      state.isAuthenticated = true;
      state.errorMessage = null;
    },
    setUserNames: (
      state,
      action: PayloadAction<{ userFirstName: string; userLastName: string }>
    ) => {
      state.userNames.userFirstName = action.payload.userFirstName;
      state.userNames.userLastName = action.payload.userLastName;
    },
    setLogout: (state) => {
      Object.assign(state, initialState);
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    }
  }
});

export const {
  setUserToken,
  setUserNames,
  setLogout,
  setErrorMessage,
  setIsAuthenticated,
  setIsLoading,
  setIsEditing
} = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
