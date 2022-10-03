import "./rightbar.css";
import { Users } from "../../fakeData";
import Friend1Online from "../../assets/person/3.jpeg";
import Online from "../online/Online";

export type FakeUser = {
  id: number;
  profilePicture: string;
  username: string
}

const fakeUsers: FakeUser[] = Users;

const Rightbar: React.FC = () => {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="ad">
          <img
            src="https://i.redd.it/zqttp05iv0k51.jpg"
            alt=""
            className="adImg"
          />
          <span className="adText">
            Don't wanna see this advertisement ? Try out{" "}
            <b>Socialism Premium </b>
            for only <b>19.99 $</b>
          </span>
        </div>
        <h4 className="rightbarTitle">Friends Online</h4>
        <ul className="rightbarFriendList">
          {fakeUsers.map((user) => (
            <Online data={user} key={user.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rightbar;
