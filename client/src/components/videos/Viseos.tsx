import React, { useEffect, useState } from "react";
import "./videos.css";
import VideoSingle from "../videoSingle/VideoSingle";
import { HiOutlineSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchSearchVideos } from "../../redux/slices/VideosSlice";
import { music, sport, travel, code } from "./videosDataExample";
import { useForm } from "react-hook-form";
import { RootState } from "../../redux/store";
import { YtVideo } from "../videoSingle/VideoSingle";
import NoResults from "../../assets/noResults.png";

type videoSearchProps = {
  searchValue: string;
};

const Viseos: React.FC = () => {
  const searchedVideos = useSelector(
    (state: RootState) => state.videosReducer?.searchVideos
  );
  const [category, setCategory] = useState<YtVideo[]>(sport);
  const dispatch = useDispatch<AppDispatch>();

  const { resetField, register, handleSubmit } = useForm({
    defaultValues: {
      searchValue: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    console.log(category, "CATEGORY USEEFFECT");
  }, [category]);

  const onSubmit = (searchValue: videoSearchProps) => {
    console.log(searchValue, "videos Searched");
    const searchVideo = async () => {
      const { payload } = await dispatch(
        fetchSearchVideos(searchValue.searchValue)
      );
      console.log(payload.items, "payload");
      setCategory(payload.items);
    };
    searchVideo();
    console.log(category, "CATEGORY AFTER SEARCH AND SET");
    resetField("searchValue");
  };

  return (
    <div className="videos">
      <div className="videosContainer">
        <div className="videosTop">
          <div className="categories">
            <ul className="categoriesList">
              <li
                onClick={(e) => setCategory(music)}
                className="categorieListItem"
              >
                My Videos
              </li>
              <li
                onClick={(e) => setCategory(searchedVideos)}
                className="categorieListItem"
              >
                Search
              </li>
              <li
                onClick={(e) => setCategory(music)}
                className="categorieListItem"
              >
                Music
              </li>
              <li
                onClick={(e) => setCategory(sport)}
                className="categorieListItem"
              >
                Sport
              </li>
              <li
                onClick={(e) => setCategory(code)}
                className="categorieListItem"
              >
                Code
              </li>
              <li
                onClick={() => setCategory(travel)}
                className="categorieListItem"
              >
                Travel
              </li>
            </ul>
            {category == searchedVideos && (
              <form className="search" onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("searchValue")}
                  type="text"
                  placeholder="Search for video"
                  className="searchVideoInput"
                />
              </form>
            )}
          </div>
        </div>
        <div className="videosButtom">
          {category.length &&
            category
              ?.filter((video) => video?.id.kind === "youtube#video")
              .slice(0, 30)
              .map((video, i) => (
                <div className="videoSingleWrapper">
                  <VideoSingle data={video} key={i} />
                </div>
              ))}
        </div>
        {!category.length && (
          <div className="noResultsWrapper">
            <img src={NoResults} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Viseos;
