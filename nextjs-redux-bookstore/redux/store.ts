
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { booksSlice } from "@/redux/selectors";
import { loadState } from '../app/localStorage/localStorage';
//import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
//import AsyncStorage from '@react-native-async-storage/async-storage';


/* const rootReducer = combineReducers({
    booksExtraReducer: booksSlice.reducer,
    loadDataReducer: booksSlice.reducer,
    filterCategoryReducer: booksSlice.reducer,
    sddItemsCartReducer: booksSlice.reducer,
    deleteItemsCartReducer: booksSlice.reducer,
    sliderReducer: booksSlice.reducer,
    moveDotsReducer: booksSlice.reducer,
    decreaseReducer: booksSlice.reducer,
    increaseReducer: booksSlice.reducer,
    totalPriceReducer: booksSlice.reducer,
});


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
    }),
})

export const persistor = persistStore(store) */
///////////////////////////////////////////////////////////////////////////
/* export const store = configureStore({
    reducer: {
        booksExtraReducer: booksSlice.reducer,
        loadDataReducer: booksSlice.reducer,
        filterCategoryReducer: booksSlice.reducer,
        sddItemsCartReducer: booksSlice.reducer,
        deleteItemsCartReducer: booksSlice.reducer,
        sliderReducer: booksSlice.reducer,
        moveDotsReducer: booksSlice.reducer,
        decreaseReducer: booksSlice.reducer,
        increaseReducer: booksSlice.reducer,
        totalPriceReducer: booksSlice.reducer, 
    },
}) */
//////////////////////////////////////////////////////preloadedState: loadState(),

const reducers = combineReducers({
    booksExtraReducer: booksSlice.reducer,
    loadDataReducer: booksSlice.reducer,
    filterCategoryReducer: booksSlice.reducer,
    addItemsCartReducer: booksSlice.reducer,
    deleteItemsCartReducer: booksSlice.reducer,
    sliderReducer: booksSlice.reducer,
    moveDotsReducer: booksSlice.reducer,
    decreaseReducer: booksSlice.reducer,
    increaseReducer: booksSlice.reducer,
    loginReducer: booksSlice.reducer,
    emailDirtyReducer: booksSlice.reducer,
    passDirtyReducer: booksSlice.reducer, 
    emailReducer: booksSlice.reducer, 
    passReducer: booksSlice.reducer, 
    emailErrorReducer: booksSlice.reducer, 
    passErrorReducer: booksSlice.reducer,
    validFormReducer: booksSlice.reducer,
    setMailProfile: booksSlice.reducer,
    setNameProfile: booksSlice.reducer,
    });

    export const store = configureStore({
        devTools: true,
        reducer: reducers,
        preloadedState: loadState(),
    });

//выведение типов из хранилища RootState и RootDispatch 
export type RootState = ReturnType<typeof store.getState>; //дает возможность не описывать типы редукторов
export type AppDispatch = typeof store.dispatch; //включает типы из thunk middleware

//useAppSelector и useAppDispatch используются во всём проекте TS в место useSelector и useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();