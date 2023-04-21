import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userToken: null,
    userNames: {userFirstName: null, userLastName: null},
    isAuthenticated : false,
    errorMessage: null,
    isLoading: null,
    isEditing: null
  },
  reducers: {
    setUserToken : (state, action) => {
      state.userToken = action.payload
      state.isAuthenticated = true
      state.errorMessage = null
    },
    setUserNames : (state, action) => {
      state.userNames.userFirstName = action.payload.userFirstName
      state.userNames.userLastName = action.payload.userLastName
    },
    setLogout : (state) => {
      state.userToken= null,
      state.userNames.userFirstName = null,
      state.userNames.userLastName = null
      state.isAuthenticated =false,
      state.errorMessage = null,
      state.isLoading = null,
      state.isEditing =null
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload
    },
    setIsLoading: (state,action) => {
      state.isLoading = action.payload
    },
    setIsEditing: (state,action) => {
      state.isEditing = action.payload
    }
  }
})

export const {setUserToken, setUserNames, setLogout, setErrorMessage, setIsAuthenticated, setIsLoading, setIsEditing } = userSlice.actions
export default userSlice.reducer