import React from "react";
import "./musicRightBar.css";
import MusicPlayer from "../MusicPlayer";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MusicRightBar: React.FC = () => {
  const activeSong = useSelector(
    (state: RootState) => state.musicReducer?.activeSong
  );
  return (
    <div className="musicRightBar">
      <div className="musicRightBarWrapper">
        {activeSong?.title && (
          <div className="musicPlayer">
            <MusicPlayer />
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicRightBar;
