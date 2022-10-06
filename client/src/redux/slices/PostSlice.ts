import { reqType } from './../../components/share/Share';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { RootState } from "../store";
import { DeletePostReqType } from '../../components/post/Post';

export type SinglePostType = {
  createdAt: string;
  _id: string;
  userId: string;
  userName: string;
  userPicture: string;
  desription: string;
  image: string;
  likes: string[];
}

type PostsType = {
  userPosts: SinglePostType [];
  feed: SinglePostType [];
}

type PostStateType = {
  posts: PostsType;
  status: string;
}

export const fetchUserPosts = createAsyncThunk(
  "auth/fetchUserPosts",
  async (params: string | undefined) => {
    const { data } = await axios.post<SinglePostType[]>(`/${params}/posts`);
    return data.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  }
);

export const fetchFeed = createAsyncThunk(
  "auth/fetchFeed",
  async (params: string | undefined) => {
    console.log("fetchFeed fired")
    const { data } = await axios.get<SinglePostType[]>(`/newsfeed/${params}`);
    return data.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  }
);

export const fetchAddPost = createAsyncThunk(
  "auth/fetchAddPost",
  async (params: reqType) => {
    console.log("fetchAddPost fired");
    console.log(params);
    const { data } = await axios.post("/post", params);
    return data.sort((a:any, b:any) => (b.createdAt > a.createdAt ? 1 : -1));
  }
);

export const fetchDeletePost = createAsyncThunk(
  //DATA: PARAMS somehow is needed for typescript axios delete method =/
  "auth/fetchDeletePost",
  async (params: DeletePostReqType) => {
    console.log("fetchDeletePost fired");
    const { data } = await axios.delete("/post", {data: params});
    console.log(data, "reseved data from DeletePost")
    return data.sort((a:any, b:any) => (b.createdAt > a.createdAt ? 1 : -1));
  }
);

const initialState: PostStateType = {
  posts: {
    userPosts: [],
    feed: [],
  },
  status: "loading",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // logOut: (state) => {
    //   state.userData.user = null;
    //   console.log("loged-out");
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserPosts.pending, (state) => {
      state.status = "loading";
    })
    builder.addCase(fetchUserPosts.fulfilled, (state: PostStateType, action) => {
      state.posts.userPosts = action.payload;
      state.status = "succese";
    })
    builder.addCase(fetchUserPosts.rejected, () => {
      console.log("smthng goes wrong in fetchUserPosts");
    })
      builder.addCase(fetchFeed.pending, (state) => {
        state.status = "loading";
      })
      builder.addCase(fetchFeed.fulfilled, (state, action) => {
        state.posts.feed = action.payload;
        state.status = "succese";
      })
      builder.addCase(fetchFeed.rejected, () => {
      console.log("smthng goes wrong in fetchFeed");
      })
        builder.addCase(fetchAddPost.pending, (state) => {
          state.status = "loading";
        })
        builder.addCase(fetchAddPost.fulfilled, (state, action) => {
          state.posts.userPosts = action.payload
          state.status = "succese";
        })
        builder.addCase(fetchAddPost.rejected, () => {
          console.log("smthng goes wrong in fetchAddPost");
        })
          builder.addCase(fetchDeletePost.pending, (state) => {
            state.status = "loading";
          })
          builder.addCase(fetchDeletePost.fulfilled, (state, action) => {
            state.posts.userPosts = action.payload
            state.status = "succese";
          })
          builder.addCase(fetchDeletePost.rejected, () => {
            console.log("smthng goes wrong in fetchDeletePost");
          })
      ;
  },
});

export const postReducer = postSlice.reducer;
