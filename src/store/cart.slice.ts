import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';

export const CART_PERSISTENT_STATE = 'cartData';

export interface CartItem {
    id: number;
    count: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<number>) => {
            const existed = state.items.find((i) => i.id === action.payload);
            if (!existed) {
                state.items.push({ id: action.payload, count: 1 });
                return;
            }
            state.items.map((i) => {
                if (i.id === action.payload) {
                    i.count += 1;
                }
                return i;
            });
        },
        decrease: (state, action: PayloadAction<number>) => {
            const existed = state.items.find((i) => i.id === action.payload);
            if (!existed) {
                return;
            }
            if (existed.count === 1) {
                cartSlice.caseReducers.remove(state, action);
                // state.items = state.items.filter(
                //     (i) => i.id !== action.payload
                // );
            } else {
                state.items.map((i) => {
                    if (i.id === action.payload) {
                        i.count -= 1;
                    }
                    return i;
                });
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((i) => i.id !== action.payload);
        },
        clean: (state) => {
            state.items = [];
        },
    },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
