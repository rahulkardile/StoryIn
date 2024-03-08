import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type User = {
  name: string;
  email: string;
  gender: string;
  _id: string;
};

export type InitialState = {
  user: User | null;
  loading: boolean;
};

const initialState: InitialState = {
  user: null,
  loading: false,
};

const UserReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.loading = true;
      state.user = action.payload;
      state.loading = false;
    },
    RemoveUser: (state) => {
        state.user = null
    }
  },
});

export default UserReducer.reducer
export const { addUser, RemoveUser } = UserReducer.actions;
