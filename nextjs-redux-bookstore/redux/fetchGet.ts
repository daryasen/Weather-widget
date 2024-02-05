import { createAsyncThunk } from '@reduxjs/toolkit';
import { TfetchTicketsError, IparamsFetch, IdataBooks } from '@/types/types';


export const fetchBooks = createAsyncThunk<IdataBooks, IparamsFetch, { rejectValue: TfetchTicketsError }>(
    "books/fetchBooks", 
    async ({subject, maxResults}: IparamsFetch, thunkApi) => { // объект thunkApi содержит функцию rejectWithValue

        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${subject}"&key=AIzaSyBcCLzRToIHmdzCQcf7uNtoVDpGU-sVf24&printType=books&startIndex=0&maxResults=${maxResults}&langRestrict=en`);

        const data: IdataBooks = await response.json();

        if (response.status !== 200) {
        
            return thunkApi.rejectWithValue({  //rejectWithValue проверяет и возвращает ошибку при не удачном запросе
            message: "Failed to fetch books." 
            });
        } 
    
        return data; // возврвщвет данные при успешном запросе
    }
);

