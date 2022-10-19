import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ISong, ISearchedSong } from "../../components/music/musicTypes"

type MusicStateType = {
  currentSongs?: ISong[];
  currentIndex: number;
  isActive?: boolean;
  isPlaying?: boolean;
  activeSong?: ISong | null;
  status: string;
  activeCategorie: string;
  selectedGanre: ISong[];
  searchedSongs: ISearchedSong[];
}

const URL = 'https://shazam-core.p.rapidapi.com/v1';

const KEY = "f03ce5b998msh6c85792591c6b4bp1486d1jsn4a7d07f25463"

const options = {
  url: URL ,
  headers: {
    'X-RapidAPI-Key': KEY,
    'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
  }
};

export const fetchSearch = createAsyncThunk(
  "music/fetchSearch",
  async (params: string) => {
    console.log(params, "params")
    const { data } =await axios.get(`${URL}/search/multi?query=${params}&search_type=SONGS_ARTISTS`, options);
    console.log(data, "DATA from fetchSearch");
    return data.tracks.hits
  }
);

export const fetchMyMusic = createAsyncThunk(
  "music/fetchMyMusic",
  async (params) => {
    console.log(params, "params")
    const { data } =await axios.post("", params);
    console.log(data, "DATA from fetchMyMusic");
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
  activeCategorie: "",
  selectedGanre: [],
  searchedSongs: [],
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {

    setGanre: (state, action) => {
      state.selectedGanre = action.payload;
      state.isActive = true;
    },
    
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;
      state.isActive = true;
    },

    setActiveCategorie: (state, action) => {
      console.log(action.payload)
      state.activeCategorie = action.payload
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
    //FETCH SEARCH
    builder.addCase(fetchSearch.pending, (state) => {
      state.status = "loading";
    })
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.searchedSongs = action.payload
      state.status = "succese";
    })
    builder.addCase(fetchSearch.rejected, (state) => {
      console.log("smthng goes wrong in fetchSearch");
      state.status = "error in fetchSearch";
    })
  }
});

export const { setActiveSong, playPause, setGanre, setActiveCategorie } = musicSlice.actions;
export const musicReducer = musicSlice.reducer;