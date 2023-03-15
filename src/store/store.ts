import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counterReducer from "./counterSlice";
import clientReducer from "./slices/clientSlice";
import themeReducer from "./slices/themeSlice";
import settingsReducer from "./slices/settingsSlice";
import orderReducer from "./slices/orderSlice";
import settingsBoxReducer from "./slices/settingBox-slice";
import cartUiReducer from "./slices/cartUI-slice";
import cartSliceReducer from "./slices/cart-slice";
import sideNavBarReducer from "./slices/sideNavBar-slice";
import megaMenuReducer from "./slices/megaMenu-slice";
import activeMenuItemReducer from "./slices/activeMenuItem-slice";
import favoriteReducer from "./slices/favorite-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      client: clientReducer,
      theme: themeReducer,
      settings: settingsReducer,
      order: orderReducer,
      settingsBox: settingsBoxReducer,
      cartUi: cartUiReducer,
      cart: cartSliceReducer,
      sideNavBar: sideNavBarReducer,
      megaMenu: megaMenuReducer,
      activeMenuItem: activeMenuItemReducer,
      favorite: favoriteReducer,
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
