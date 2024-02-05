import { createSlice } from '@reduxjs/toolkit';
import { fetchBooks } from '@/redux/fetchGet';
import { RootState  } from '@/redux/store';
import { listCategories } from '@/datas/categoryData';
import { sliderData } from '@/datas/sliderData';
import { TbooksInitState, IdataBooks, IparamsFetch, IdataSlider } from '@/types/types';



export const initialState: TbooksInitState = {
    sliderData,
    sliderIndex: 0,
    dataBooks: {
        items: [],
    },
    error: null,
    status: "idle",
    paramsFetch: {
        subject: 'Architecture',
        maxResults: 6,
    },
    listCategories,
    dataCart: {
        itemsCart: [],
    },
    dataCartDetails: {
        itemsCartDetails: [],
    },
    generalArreyCart: [],
    login: false,
    email: '',
    password: '',
    emailDirty: false,
    passDirty: false,
    emailError: 'Email не может быть пустым',
    passError: 'Пороль не может быть пустым',
    validForm: false,
    mailProfile: '',
    nameProfile: '',
};

export const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {   

    sliderReducer: (state) => {
        if(state.sliderIndex !== state.sliderData.length - 1) {
            state.sliderIndex += 1;
        }else if(state.sliderIndex === state.sliderData.length - 1) {
            state.sliderIndex = 0;
        }
    },

    moveDotsReducer: (state, action) => {
        state.sliderIndex = action.payload;
    },
    
    loadDataReducer: (state, action) => {
        state.paramsFetch.maxResults += action.payload;
    },

    filterCategoryReducer: (state, action) => {
        state.dataBooks.items = [];
        state.paramsFetch.maxResults = 6;
        state.paramsFetch.subject = action.payload;
    },

    addItemsCartReducer: (state, action) => {
        state.dataCart.itemsCart = [...state.dataCart.itemsCart, {...action.payload}];
        state.generalArreyCart = [...state.dataCart.itemsCart, ...state.dataCartDetails.itemsCartDetails];
    },

    deleteItemsCartReducer: (state, action) => {
        state.dataCart.itemsCart = state.dataCart.itemsCart.filter(book => book.id !== action.payload);
        state.dataCartDetails.itemsCartDetails = state.dataCartDetails.itemsCartDetails.filter(book => book.id !== action.payload);;
        state.generalArreyCart = [...state.dataCart.itemsCart, ...state.dataCartDetails.itemsCartDetails];
    },

    increaseReducer: (state, action) => {
        state.dataCartDetails.itemsCartDetails = [...state.dataCartDetails.itemsCartDetails, {...action.payload}];
        state.generalArreyCart = [...state.dataCart.itemsCart, ...state.dataCartDetails.itemsCartDetails];
    },

    decreaseReducer: (state, action) => {   
        let priceIndex = state.dataCartDetails.itemsCartDetails.findIndex((book) => book.id === action.payload);
        if(priceIndex > -1) state.dataCartDetails.itemsCartDetails.splice(priceIndex, 1); 
        state.generalArreyCart = [...state.dataCart.itemsCart, ...state.dataCartDetails.itemsCartDetails];
    },

    loginReducer: (state) => {
        state.login = true;
    },

    emailDirtyReducer: (state, action) => {
        state.emailDirty = action.payload;
    },

    passDirtyReducer: (state, action) => {
        state.passDirty = action.payload;
    },

    emailReducer: (state, action) => {
        state.email = action.payload;
    },

    passReducer: (state, action) => {
        state.password = action.payload;
    },
    emailErrorReducer: (state, action) => {
        state.emailError = action.payload;
    },

    passErrorReducer: (state, action) => {
        state.passError = action.payload;
    },

    validFormReducer: (state, action) => {
        state.validForm = action.payload;
    },

    setMailProfile: (state, action) => {
        state.mailProfile = action.payload;
    }, 

    setNameProfile: (state, action) => {
        state.nameProfile = action.payload;
    },

    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchBooks.pending, (state) => {
        
            state.status = "loading";
            state.error = null;
    });

        builder
        .addCase(fetchBooks.fulfilled, 
            (state, { payload }) => { 
            state.dataBooks = {...state.dataBooks, ...payload};
            state.status = "idle";
    });

        builder
        .addCase(fetchBooks.rejected, 
            (state, { payload }) => {

            if (payload) state.error = payload.message; //В payload.message приходит из fetchBooks => return thunkApi.rejectWithValue({ message: "Failed to fetch books." })
            state.status = "idle";
    })
    }
})

export const selectStatus = (state: RootState): "loading" | "idle" => state.booksExtraReducer.status; //статус в booksExtraReducer
export const selectDataBooks = (state: RootState): IdataBooks[] => state.booksExtraReducer.dataBooks.items;
export const selectCategory = (state: RootState): string[] => state.booksExtraReducer.listCategories;
export const selectCartItems = (state: RootState): IdataBooks[] => state.booksExtraReducer.dataCart.itemsCart;
export const selectViewItemCount = (state: RootState): IdataBooks[] => state.booksExtraReducer.dataCartDetails.itemsCartDetails;
export const selectGeneralArreyCart = (state: RootState): IdataBooks[] => state.booksExtraReducer.generalArreyCart;



export const selectEmailDirty = (state: RootState): boolean => state.booksExtraReducer.emailDirty;
export const selectPasswordDirty = (state: RootState): boolean => state.booksExtraReducer.passDirty;
export const selectEmailError = (state: RootState): string => state.booksExtraReducer.emailError;
export const selectPassError = (state: RootState): string => state.booksExtraReducer.passError;
export const selectEmail = (state: RootState): string => state.booksExtraReducer.email;
export const selectPassword = (state: RootState): string => state.booksExtraReducer.password;
export const selectValidForm = (state: RootState): boolean => state.booksExtraReducer.validForm;
export const selectMailProfile = (state: RootState): string => state.booksExtraReducer.mailProfile;
export const selecNameProfile = (state: RootState): string => state.booksExtraReducer.nameProfile;



export const selectLoadParams = (state: RootState): IparamsFetch => state.loadDataReducer.paramsFetch;
export const selectCategoryParams = (state: RootState): string => state.filterCategoryReducer.paramsFetch.subject;
export const selectSlider = (state: RootState): IdataSlider[] => state.sliderReducer.sliderData;
export const selectSliderIndex = (state: RootState): number => state.sliderReducer.sliderIndex;
export const selectLogin = (state: RootState): boolean => state.loginReducer.login;


export const { loadDataReducer, filterCategoryReducer, addItemsCartReducer, deleteItemsCartReducer, sliderReducer, moveDotsReducer, increaseReducer, decreaseReducer, loginReducer, emailDirtyReducer, passDirtyReducer, emailReducer, passReducer, emailErrorReducer, passErrorReducer, validFormReducer, setNameProfile, setMailProfile } = booksSlice.actions;