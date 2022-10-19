import React, { useEffect } from "react";
import "./music.css";
import Song from "../song/Song";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { AppDispatch } from "../../redux/store";
import { playPause } from "../../redux/slices/MusicSlice";

const Music: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeSong = useSelector(
    (state: RootState) => state.musicReducer?.activeSong
  );
  const isPlaying = useSelector(
    (state: RootState) => state.musicReducer?.isPlaying
  );
  const selectedMusic = useSelector(
    (state: RootState) => state.musicReducer?.selectedGanre
  );
  const activeCategorie = useSelector(
    (state: RootState) => state.musicReducer?.activeCategorie
  );
  const searchedSongs = useSelector(
    (state: RootState) => state.musicReducer?.searchedSongs
  );

  useEffect(() => {
    dispatch(playPause(false));

    return () => {
      dispatch(playPause(false));
      console.log(isPlaying);
    };
  }, []);

  return (
    <div className="music">
      <div className="musicWrapper">
        {activeCategorie !== "search"
          ? selectedMusic?.map((song, i) => (
              <Song
                key={song.key}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={selectedMusic}
              />
            ))
          : searchedSongs?.map((song) => (
              <Song
                key={song.track.key}
                song={song.track}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={searchedSongs}
              />
            ))}
      </div>
    </div>
  );
};

export default Music;
