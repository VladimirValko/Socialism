import React from "react";
import "./usersList.css";
import UserCard from "../userCard/UserCard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const UsersList = () => {
  const allUsers = useSelector((state: RootState) => state.userReducer.users);
  return (
    <div className="userList">
      <div className="userListWrapper">
        {allUsers?.map((user, i) => (
          <UserCard data={user} key={i} />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
