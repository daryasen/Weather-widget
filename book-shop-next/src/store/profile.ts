import {createSlice} from "@reduxjs/toolkit";
import {IBook} from "@/data/types";


export interface ICartItem {
    book: IBook,
    quantity: number,
}

export interface IProfileState {
    token: string,
    user: {
        email: string,
        name: string,
        about: string,
    },
    cart: ICartItem[],
}


const initialState: IProfileState = {
    token: '',
    user: {
        email: '',
        name: '',
        about: '',
    },
    cart: [],
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        setCart(state, action) {
            state.cart = action.payload;
        },
        addToCart(state, action) {
            state.cart.push(action.payload);
        },
        changeQuantity(state, action) {
            const {book, quantity} = action.payload;
            const index = state.cart.findIndex(cartItem => cartItem.book.id === book.id);
            state.cart[index].quantity = quantity;
            if (state.cart[index].quantity === 0) {
                state.cart.splice(index, 1);
            }
        }
    },
})

export default profileSlice.reducer;
export const {setToken, setUser, setCart, addToCart, changeQuantity} = profileSlice.actions;
