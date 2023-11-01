/// <reference types="redux-persist" />
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import filterSlice from "@/store/filters";
import booksSlice from "@/store/books";
import profileSlice from "@/store/profile";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import {booksApi} from "@/api/booksApi";


const persistConfig = {
    key: "root",
    storage
}

const rootReducer = combineReducers({
    filter: filterSlice,
    books: booksSlice,
    profile: profileSlice,
    booksApi: booksApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(booksApi.middleware),
});

export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;