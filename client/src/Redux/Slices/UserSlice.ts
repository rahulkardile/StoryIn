import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type User = {
  name: string;
  email: string;
  gender: string;
  _id: string;
  valid?: Date;
  status: boolean;
  role: string;
};

export type InitialState = {
  user: User | null;
  status: boolean;
  loading: boolean;
};

const initialState: InitialState = {
  user: null,
  status: false,
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
      state.user = null;
    },
    addStatus: (state) => {
      state.status = true;
      if (state.user !== null) {
        state.user.status = true;
      }
    },
    RemoveStatus: (state) => {
      state.status = false;
    },
    changeRole: (state) => {
      if (state.user !== null) {
        state.user.role = "creator";
      }
    },
  },
});

export default UserReducer.reducer;
export const { addUser, RemoveUser, addStatus, RemoveStatus, changeRole } =
  UserReducer.actions;
