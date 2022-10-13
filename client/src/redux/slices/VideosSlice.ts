import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { YtVideo } from "../../components/videoSingle/VideoSingle";

const URL = 'https://youtube-v31.p.rapidapi.com';

const oldKey = '955b3bd9a2msh85c8354d60e9b76p19863djsnb205e04031b5'
const newKey = "f03ce5b998msh6c85792591c6b4bp1486d1jsn4a7d07f25463"

const options = {
    url: URL ,
    params: {
      maxResults: '50'
    },
    headers: {
      'X-RapidAPI-Key': "puk-puk",
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };

export const fetchVideosFromAPI = async (url: string) => {
  const { data } = await axios.get(`${URL}/${url}`, options);
    console.log(data);
  return data
}

//TYPES

type videoSliceType = {
  searchVideos: YtVideo[];
  status: string;
}

// THUNKS
export const fetchSearchVideos = createAsyncThunk(
  "videos/fetchSearchVideos",
  async (params:string | undefined) => {
    console.log(params);
    const { data } = await axios.get(`${URL}/search?part=snippet&q=${params}`, options);
    console.log(data, "data from fetchSearchVideos");
    return data
  }
);


// STATE
const initialState: videoSliceType = {
  searchVideos: [],
  status: "loading",
};


// SLICE
const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //FETCH SEARCH VIDEOS
    builder.addCase(fetchSearchVideos.pending, (state) => {
      state.status = "loading";
    })
    builder.addCase(fetchSearchVideos.fulfilled, (state, action) => {
      state.searchVideos = action.payload.items;
      state.status = "succese";
    })
    builder.addCase(fetchSearchVideos.rejected, () => {
      console.log("smthng goes wrong in fetchAllVideos");
    })
    ;
  },
});

export const videosReducer = videosSlice.reducer;
