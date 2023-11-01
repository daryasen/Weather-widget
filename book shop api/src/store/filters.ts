import {createSlice} from "@reduxjs/toolkit";


export interface IFilterState {
    category: string,
    startIndex: number,
}

const initialState: IFilterState = {
    category: '',
    startIndex: 0,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setStartIndex: (state, action) => {
            state.startIndex = action.payload;
        },
    }
});

export default filterSlice.reducer;