import "./user.css";
import React, { useEffect, useState } from "react";
import { fetctEditProfile } from "../../redux/slices/AuthSlice";
import { SinglePostType } from "../../redux/slices/PostSlice";
import Share from "../share/Share";
import { RootState } from "../../redux/store";
import Post from "../post/Post";
import { logOut } from "../../redux/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { AppDispatch } from "../../redux/store";

export type EditProfileDataType = {
  username: string;
  coverPicture: string;
  description: string;
  hometown: string;
  relationship: string;
  birthday: string;
  userId: string | undefined;
};

const User: React.FC = () => {
  console.log("user did render");
  const usersData = useSelector(
    (state: RootState) => state.authReducer.userData.user
  );
  const usersPosts = useSelector(
    (state: RootState) => state.postReducer.posts.userPosts
  );

  const [isEdditing, setIsEdditing] = useState(false);
  const [profileUserData, setProfileUserData] = useState(usersData);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(usersPosts);
  }, [usersPosts]);

  useEffect(() => {
    setProfileUserData(usersData);
  }, [usersData]);

  const handleEditClick = () => {
    setIsEdditing(!isEdditing);
  };

  const onClickLogout = () => {
    if (window.confirm("You are shure you want to logout?")) {
      dispatch(logOut());
      navigate("/login", { replace: true });
      window.localStorage.removeItem("token");
    }
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: usersData?.username || "John Smith",
      coverPicture:
        usersData?.coverPicture ||
        "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
      description:
        usersData?.description ||
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio sint dicta ab ducimus voluptatum architecto quaerat, id labore laudantium eum assumenda vero adipisci dolorem delectus repudiandae quidem nobis quod voluptate, id labore laudantium eum assumenda vero adipisci dolorem delectus repudiandae quidem nobis quod voluptate.",
      hometown: usersData?.hometown || "London",
      relationship: usersData?.relationship || "Single",
      birthday: usersData?.birthday || "10.03.2000",
      userId: usersData?._id,
    },
    mode: "onChange",
  });

  const onSubmit = async (userEditData: EditProfileDataType) => {
    await dispatch(fetctEditProfile(userEditData));
    setIsEdditing(!isEdditing);
    window.alert("Your profile has been changed.");
  };

  return (
    <div className="user">
      <div className="userLeft">
        <div className="profileImg">
          <img src={profileUserData?.coverPicture} alt="" />
        </div>
        <div className="profileMedia"></div>
      </div>
      <div className="userRight">
        <div className="profileInfo">
          <div className="nameLogout">
            <div className="userName">
              <span>
                <b>{profileUserData?.username}</b>
              </span>
              <div className="editProfile" onClick={handleEditClick}>
                <AiOutlineEdit className="editProfileIcon" />
                <span className="editProfileText">Edit profile</span>
              </div>
            </div>
            <button className="logoutBtn" onClick={() => onClickLogout()}>
              Log out
            </button>
          </div>
          <div className="mainInfo">
            <span>
              Relationship: <b>{profileUserData?.relationship}</b>
            </span>

            <span className="birthday">
              Birthday <b>{profileUserData?.birthday}</b>
            </span>

            <span>
              My hometown is <b>{profileUserData?.hometown}</b>
            </span>
          </div>
          <div className="dexcriptionContainer">
            <span>{profileUserData?.description}</span>
          </div>
        </div>
        {isEdditing && (
          <div className="editProfileFormWrapper">
            <form onSubmit={handleSubmit(onSubmit)} className="editProfileForm">
              <div className="formBlock">
                <span>Profile image url</span>
                <input type="text" {...register("coverPicture")} />
              </div>
              <div className="formBlock">
                <span>Your name</span>
                <input type="text" {...register("username")} />
              </div>
              <div className="formBlock">
                <span>Your Relationship status</span>
                <select {...register("relationship")}>
                  <option value="Single">Single</option>
                  <option value="In Relationship">In Relationship</option>
                </select>
              </div>
              <div className="formBlock">
                <span>Your Birthday</span>
                <input
                  type="date"
                  placeholder="Your Birthday"
                  {...register("birthday")}
                />
              </div>
              <div className="formBlock">
                <span>Your Hometown</span>
                <input type="text" {...register("hometown")} />
              </div>
              <div className="formBlock">
                <span>Info about you</span>
                <input type="text" {...register("description")} />
              </div>
              <button type="submit" className="submitProfileEditBtn">
                Submit
              </button>
            </form>
          </div>
        )}
        <div className="share">
          <Share />
        </div>
        <div className="userPosts">
          {usersPosts?.map((post, i) => (
            <Post
              data={post}
              image={usersData?.coverPicture}
              key={i}
              userpage={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
