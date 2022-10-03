import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

type UserData = {
  username: string;
  email: string;
  password: string;
  coverPicture: string;
  followers: string[];
  followins: string[];
};

type RegisterType = {
  username: string;
  email: string;
  password: string;
}

type AuthType = {
  email: string;
  password: string;
}

type StateType = {
  data: UserData | null;
  status: string;
}

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: RegisterType) => {
    const { data } = await axios.post("/register", params);
    console.log(data);
    return data;
  }
);

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params: AuthType) => {
    const { data } = await axios.post("/login", params);
    console.log(data);
    return data;
  }
);

const initialState: StateType = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.data = null;
      console.log("loged-out");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = "loading";
    })
      builder.addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succese";
      })
      builder.addCase(fetchAuth.rejected, (state) => {
        console.log("smthng goes wrong");
        state.data = null;
      })
      builder.addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
      })
      builder.addCase(fetchRegister.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succese";
      })
      builder.addCase(fetchRegister.rejected, (state) => {
        console.log("smthng goes wrong");
        state.data = null;
      });
  },
});

export const selectIsAuth = (state: any) => Boolean(state.auth.data);

export const { logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
