import React, { useEffect } from "react";
import "./music.css";
import Song from "../song/Song";
import { charts } from "./charts";
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
        {charts?.map((song, i) => (
          <Song
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={charts}
          />
        ))}
      </div>
    </div>
  );
};

export default Music;
