import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Slices/UserSlice";
import storage from "redux-persist/lib/storage";
import FevReducer from "./Slices/Fevs";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistCombineReducers(persistConfig, { user: UserReducer, fev: FevReducer });

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (def) =>
    def({
      serializableCheck: false,
    }),
});

export type ReduxStates = ReturnType<typeof store.getState>;
