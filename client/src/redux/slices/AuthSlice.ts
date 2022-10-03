import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios"

export const fetchRegister: any = createAsyncThunk('auth/fetchRegister', async (params) => {
  const { data } = await axios.post("/register", params);
  console.log(data);
  return data;
});

export const fetchAuth: any = createAsyncThunk('auth/fetchAuth', async (params) => {
  const { data } = await axios.post("/login", params);
  console.log(data);
  return data;
});

const initialState = {
  data: null,
  status: 'loading'
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      logOut: (state) => {
          state.data = null;
          console.log('loged-out')
      }
  },

  extraReducers: {
      [fetchAuth.pending]: (state) => {
          state.status = 'loading';
      },
      [fetchAuth.fulfilled]: (state, action) => {
          state.data = action.payload;
          state.status = 'loaded';
      }, 
      [fetchAuth.rejected]: (state) => {
          state.data = null;
          state.status = 'error';
      },



      [fetchRegister.pending]: (state) => {
          state.status = 'loading';
      },
      [fetchRegister.fulfilled]: (state, action) => {
          state.data = action.payload;
          state.status = 'loaded';
      }, 
      [fetchRegister.rejected]: (state) => {
          state.data = null;
          state.status = 'error';
      }
  }
});

export const selectIsAuth = (state: any) => Boolean(state.auth.data);

export const { logOut } = authSlice.actions;

export const authReducer = authSlice.reducer