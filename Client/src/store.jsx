import {configureStore} from "@reduxjs/toolkit"
import myreducers from "./cartSlice"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "root",
    storage,
  };

const persistedReducer = persistReducer(persistConfig, myreducers);

const store = configureStore({
    reducer:{
        mycart:persistedReducer
    }
})
export const persistor = persistStore(store);

export default store