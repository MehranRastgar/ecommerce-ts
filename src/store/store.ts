import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counterReducer from "./counterSlice";
import clientReducer from "./slices/clientSlice";
import themeReducer from "./slices/themeSlice";
import settingsReducer from "./slices/settingsSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      client: clientReducer,
      theme: themeReducer,
      settings: settingsReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
