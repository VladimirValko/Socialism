import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ISong } from "../../components/music/musicTypes"

type MusicStateType = {
  currentSongs?: ISong[];
  currentIndex: number;
  isActive?: boolean;
  isPlaying?: boolean;
  activeSong?: ISong | null;
  status: string;
  worldCharts: ISong[];
  searchedSongs: ISong[];
}

const URL = 'https://shazam-core.p.rapidapi.com/v1';

const KEY = "f03ce5b998msh6c85792591c6b4bp1486d1jsn4a7d07f25463"

const options = {
  url: URL ,
  params: {query: 'mask'},
  headers: {
    'X-RapidAPI-Key': "puk-puk",
    'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
  }
};

export const fetchWorldCharts = createAsyncThunk(
  "music/fetchWorldCharts",
  async () => {
    const { data } =await axios.get(`${URL}/charts/world`, options);
    console.log(data, "DATA from MUSIC");
    return data
  }
);


const initialState: MusicStateType = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: null,
  status: "",
  worldCharts: [],
  searchedSongs: [],
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    
    setActiveSong: (state, action) => {
    state.activeSong = action.payload.song;
    state.isActive = true;
    },

    playPause: (state, action) => {
      if (!action?.payload) {
        state.isPlaying = !state.isPlaying;
      } else {
        state.isPlaying = action.payload
      }
    },

  },
  extraReducers: (builder) => {
    //FETCH WORLD CHARTS
    builder.addCase(fetchWorldCharts.pending, (state) => {
      state.status = "loading";
    })
    builder.addCase(fetchWorldCharts.fulfilled, (state, action) => {
      state.worldCharts = action.payload;
      state.status = "succese";
    })
    builder.addCase(fetchWorldCharts.rejected, () => {
      console.log("smthng goes wrong in fetchWorldCharts");
    })
  }
});

export const { setActiveSong, playPause } = musicSlice.actions;
export const musicReducer = musicSlice.reducer;