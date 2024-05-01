import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import { PREFIX } from '../helpers/API';
import { LoginResponse } from '../interfaces/auth.interface';
import axios from 'axios';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
    jwt: string | null;
}

export interface UserState {
    jwt: string | null;
    loginState: null | 'rejected';
}

const initialState: UserState = {
    jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const login = createAsyncThunk(
    'user/login',
    async (params: { email: string; password: string }) => {
        const { data } = await axios.post<LoginResponse>(
            `${PREFIX}/auth/login`,
            {
                email: params.email,
                password: params.password,
            }
        );
        return data;
    }
); // переходник для того, чтобы в рамках reducer можно было вызывать (асинхронную функцию как синхронную)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.jwt = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            login.fulfilled, // если функция login успешно выполняется - промис ресолвится => promise в fulfilled
            (state, action: PayloadAction<LoginResponse>) => {
                state.jwt = action.payload.access_token;
            }
        );
        // builder.addCase(login.rejected, (state, action) => {
        //     console.log(action);
        //     // state.loginState = 'rejected';
        // });
    },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
