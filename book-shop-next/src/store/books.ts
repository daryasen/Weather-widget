import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBook} from "@/data/types";

interface IBookState {
    books: IBook[];
}


const initialState: IBookState = {
    books: [],
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload;
        },
        pushBooks: (state, action: PayloadAction<IBook[]>) => {
            state.books.push(...action.payload);
        },
        clearBooks: (state) => {
            state.books = [];
        }
    },
});

export default booksSlice.reducer;