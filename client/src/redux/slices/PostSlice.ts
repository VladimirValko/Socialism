import { reqType } from './../../components/share/Share';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { RootState } from "../store";
import { PostReqType } from '../../components/post/Post';


//TYPES
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


// THUNKS
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
    const { data } = await axios.get<SinglePostType[]>(`/newsfeed/${params}`);
    return data.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  }
);

export const fetchAddPost = createAsyncThunk(
  "auth/fetchAddPost",
  async (params: reqType) => {
    const { data } = await axios.post("/post", params);
    return data.sort((a:any, b:any) => (b.createdAt > a.createdAt ? 1 : -1));
  }
);

export const fetchDeletePost = createAsyncThunk(
  //some weird shit here, googled on stackoverflow
  //DATA: PARAMS is somehow needed for typescript axios delete method =/
  "auth/fetchDeletePost",
  async (params: PostReqType) => {
    const { data } = await axios.delete("/post", {data: params});
    return data.sort((a:any, b:any) => (b.createdAt > a.createdAt ? 1 : -1));
  }
);

export const fetchLikePost = createAsyncThunk(
  "auth/fetchLikePost",
  async (params: PostReqType) => {
    const { data } = await axios.put("/like", params);
    return data.sort((a:any, b:any) => (b.createdAt > a.createdAt ? 1 : -1));
  }
);


// STATE
const initialState: PostStateType = {
  posts: {
    userPosts: [],
    feed: [],
  },
  status: "loading",
};


// SLICE
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //FETCH USER POSTS
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
      // FETCH FEED
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
      // FETCH ADD POST
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
          // FETCH DELETE POST
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
            // FETCH LIKE - DISLIKE
            builder.addCase(fetchLikePost.pending, (state) => {
              state.status = "loading";
            })
            builder.addCase(fetchLikePost.fulfilled, (state, action) => {
              state.posts.feed = action.payload
              state.status = "succese";
            })
            builder.addCase(fetchLikePost.rejected, () => {
              console.log("smthng goes wrong in fetchLikePost");
            })
      ;
  },
});

export const postReducer = postSlice.reducer;
