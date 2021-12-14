import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectUserGists,
  selectUserInfo,
  setUserGists,
} from "../../features/user/userSlice";
import moment from "moment";
import Gist from "react-gist";
import "./UserProfile.scss";
import { useEffect } from "react";
import { getUserGists } from "../../app/services";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const userInfo = useAppSelector((st) => selectUserInfo(st));
  const userGists = useAppSelector((st) => selectUserGists(st));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!!userInfo["login"]) {
      getUserGists(userInfo["login"]).then((res) =>
        dispatch(setUserGists(res.data))
      );
    }
  }, [userInfo]);

  return (
    <section className="user-profile-container">
      <div className="row-layout">
        <div className="profile-info">
          <img src={userInfo["avatar_url"]} className="avatar" />
          <span className="username">{userInfo["name"]}</span>
          <a target="_blank" href={`https://github.com/${userInfo["login"]}`}>
            <button className="github-profile-button">
              View GitHub Profile
            </button>
          </a>
        </div>
        <div className="user-gists-container">
          {userGists.map((gist) => {
            const date = gist["created_at"]
              ? moment(gist["created_at"]).fromNow()
              : "";
            return (
              <div className="gist-container">
                <div
                  className="user-info"
                  onClick={() => navigate(`/view/${gist["id"]}`)}
                >
                  <img
                    className="avatar"
                    src={
                      gist["repository"]
                        ? gist["repository"]["owner"]["avatar_url"]
                        : gist["owner"]["avatar_url"]
                    }
                  />
                  <div className="file-info-container">
                    <span className="user-name">
                      {gist["repository"]
                        ? gist["repository"]["owner"]["login"]
                        : gist["owner"]["login"]}
                      /
                      <span className="file-name">
                        {Object.keys(gist["files"])[0]}
                      </span>
                    </span>
                    <span>Created {date}</span>
                    <span className="description">
                      {gist["repository"]
                        ? gist["repository"]["description"]
                        : gist["description"] || ""}
                    </span>
                  </div>
                </div>
                <div className="content">
                  <Gist
                    id={gist["id"]}
                    file={
                      gist["files"][Object.keys(gist["files"])[0]]["filename"]
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
    </section>
  );
}

export default UserProfile;
