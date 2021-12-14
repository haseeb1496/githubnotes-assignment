import "./ViewGist.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteGist, getGist } from "../../app/services";
import moment from "moment";
import { RiDeleteBinLine } from "react-icons/ri";
import { CgGitFork } from "react-icons/cg";
import { useAppSelector } from "../../app/hooks";
import { selectUserInfo } from "../../features/user/userSlice";
import Gist from "react-gist";

function ViewGist() {
  const { id }: any = useParams();
  const navigate = useNavigate();
  const [view, setView] = useState<any>();
  const loginUserId = useAppSelector((st) => selectUserInfo(st))["id"];

  const deleteGistHandler = () => {
    deleteGist(id).then(() => navigate("/profile"));
  };
  useEffect(() => {
    getGist(id).then((res) => {
      const gist = res.data;
      const deleteButton =
        loginUserId === gist["owner"]["id"] ? (
          <div
            className="delete-gist-button"
            onClick={() => deleteGistHandler()}
          >
            <RiDeleteBinLine />
            <span>Delete</span>
          </div>
        ) : (
          ""
        );
      const date = gist["created_at"]
        ? moment(gist["created_at"]).fromNow()
        : "";
      const gistView = (
        <>
          <div className="gist-info">
            <div className="user-info">
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
            <div className="additional-info">
              {deleteButton}
              <div className="fork-info-container">
                <CgGitFork className="fork-icon" />
                <span>Forks</span>
                <span className="fork-count">{gist["forks"].length}</span>
              </div>
            </div>
          </div>
          <div className="content">
            <Gist
              id={id}
              file={gist["files"][Object.keys(gist["files"])[0]]["filename"]}
            />
          </div>
        </>
      );
      setView(gistView);
    });
  }, []);

  return <section className="view-gist-container">{view}</section>;
}

export default ViewGist;
