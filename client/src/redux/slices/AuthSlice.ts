import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { RootState } from "../store"

export type UserDataType = {
  _id: string;
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

type AuthResponse = {
  token: string;
  user: UserDataType;
}

type StateType = {
  userData: {
    user: UserDataType | null;
    token: string;
  };
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
    console.log(data, "data from fetch");
    return data;
  }
);

const initialState: StateType = {
  userData: {
    user: null,
    token: ""
  },
  
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.userData.user = null;
      console.log("loged-out");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = "loading";
    })
      builder.addCase(fetchAuth.fulfilled, (state: StateType, action) => {
        state.userData = action.payload;
        state.status = "succese";
      })
      builder.addCase(fetchAuth.rejected, (state) => {
        console.log("smthng goes wrong");
        state.userData.user = null;
      })
      builder.addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
      })
      builder.addCase(fetchRegister.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "succese";
      })
      builder.addCase(fetchRegister.rejected, (state) => {
        console.log("smthng goes wrong");
        state.userData.user = null;
      });
  },
});

export const selectIsAuth = (state: RootState) => Boolean(state.authReducer.userData);

export const { logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
