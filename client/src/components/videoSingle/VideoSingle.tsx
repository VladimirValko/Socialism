import React from "react";
import "./videoSingle.css";
import ReactPlayer from "react-player/lazy";
import { MdAddCircleOutline } from "react-icons/md";

type SingleVideo = {
  data: YtVideo;
  key: number;
};

export type YtVideo = {
  kind?: string;
  id: {
    kind?: string;
    videoId?: string;
    channelId?: string;
  };
  snippet?: {
    publishedAt?: string;
    channelId?: string;
    title?: string;
    description?: string;
    thumbnails?: {
      default?: {
        url?: string;
        width?: number;
        height?: number;
      };
      medium?: {
        url?: string;
        width?: number;
        height?: number;
      };
      high?: {
        url?: string;
        width?: number;
        height?: number;
      };
    };
    channelTitle?: string;
    liveBroadcastContent?: string;
    publishTime?: string;
  };
};

const VideoSingle: React.FC<SingleVideo> = ({ data }) => {
  return (
    <div className="videoSingle">
      <div className="videoSingleTop">
        <ReactPlayer
          // url={`www.youtube.com/watch?v=${data?.id?.videoId}`}
          className="videoPlayer"
          controls={true}
          width={"100%"}
        />
      </div>
      <div className="videoSingleButtom">
        <div className="videoSingleTitle">
          {data?.snippet?.title}
          <div className="addVideo">
            Add
            <MdAddCircleOutline className="addVideoIcon" />
          </div>
        </div>
        <div className="videoSingleChannelAndBtn">
          Published on channel <b>{data?.snippet?.channelTitle}</b>
        </div>
        {/* УСЛОВНЫЙ РЕНДЕРИНГ КНОПКИ ДОБАВИТЬ _ УБРАТЬ */}
        {/* <button className="addVideoBtn">Add to my videos</button> */}
      </div>
    </div>
  );
};

export default VideoSingle;
