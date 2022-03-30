import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/Auth.js";
import user from "./slices/User.js";

const persistConfig = {
  key: "xxxx-key-xxxx",
  storage,
};

const auth = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth,
    user
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
